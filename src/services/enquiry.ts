/**
 * Enquiry submission client.
 *
 * This website is a static site (S3 + CloudFront) with no backend of its own.
 * To accept enquiries, deploy an HTTPS endpoint — for example AWS API Gateway
 * in front of a Lambda function that validates the payload and forwards it by
 * email (SES) or stores it (DynamoDB) — and set VITE_CONTACT_ENDPOINT at
 * build time. The endpoint must:
 *   - accept `POST` with `Content-Type: application/json` and an EnquiryPayload body
 *   - allow CORS from the site's origin
 *   - respond 2xx only once the enquiry has actually been accepted
 *   - re-validate every field server-side and apply rate limiting / spam checks
 *
 * Until the endpoint is configured, the contact form prepares a pre-filled
 * email (mailto:) in the visitor's own email app instead, and says plainly
 * that nothing is sent until they press Send there.
 */

export const organisationTypes = [
  'Farm owner',
  'Agricultural business',
  'Technology partner',
  'School or educational institution',
  'Industry collaborator',
  'Mentor or investor',
  'Wholesale buyer',
  'Other',
] as const;

export type OrganisationType = (typeof organisationTypes)[number];

export interface EnquiryPayload {
  fullName: string;
  organisation: string;
  email: string;
  organisationType: OrganisationType;
  subject: string;
  message: string;
  consent: true;
  /** ISO timestamp the visitor gave consent. */
  consentedAt: string;
  /** Page the enquiry was sent from. */
  source: string;
  /** Honeypot field — must be empty. Bots tend to fill it in. */
  website: string;
}

export type EnquiryResult =
  | { status: 'sent' }
  | { status: 'unavailable' }
  | { status: 'error'; message: string };

const endpoint = (import.meta.env.VITE_CONTACT_ENDPOINT ?? '').trim();

export const isEnquiryServiceConfigured = endpoint.length > 0;

const REQUEST_TIMEOUT_MS = 15000;

export async function submitEnquiry(payload: EnquiryPayload): Promise<EnquiryResult> {
  if (!isEnquiryServiceConfigured) {
    return { status: 'unavailable' };
  }

  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    if (response.ok) {
      return { status: 'sent' };
    }
    if (response.status === 429) {
      return { status: 'error', message: 'Too many requests. Please wait a few minutes and try again.' };
    }
    if (response.status >= 400 && response.status < 500) {
      return { status: 'error', message: 'Your enquiry could not be accepted. Please check the details and try again.' };
    }
    return { status: 'error', message: 'Our enquiry service is temporarily unavailable. Please try again later.' };
  } catch (err) {
    const aborted = err instanceof DOMException && err.name === 'AbortError';
    return {
      status: 'error',
      message: aborted
        ? 'The request timed out. Please check your connection and try again.'
        : 'We could not reach our enquiry service. Please check your connection and try again.',
    };
  } finally {
    window.clearTimeout(timeout);
  }
}
