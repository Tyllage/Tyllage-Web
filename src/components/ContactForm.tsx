import { useEffect, useId, useRef, useState, type ChangeEvent, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, ArrowUpRight, CheckCircle2, Info, Loader2, Send } from 'lucide-react';
import { company } from '../data/company';
import {
  isEnquiryServiceConfigured,
  organisationTypes,
  submitEnquiry,
  type OrganisationType,
} from '../services/enquiry';

interface FormValues {
  fullName: string;
  organisation: string;
  email: string;
  organisationType: OrganisationType | '';
  subject: string;
  message: string;
  consent: boolean;
  website: string; // honeypot
}

type FieldName = Exclude<keyof FormValues, 'website'>;
type FormErrors = Partial<Record<FieldName, string>>;

type SubmitState =
  | { kind: 'idle' }
  | { kind: 'submitting' }
  | { kind: 'sent' }
  | { kind: 'unavailable' }
  | { kind: 'error'; message: string };

const initialValues: FormValues = {
  fullName: '',
  organisation: '',
  email: '',
  organisationType: '',
  subject: '',
  message: '',
  consent: false,
  website: '',
};

const LIMITS = {
  fullName: 100,
  organisation: 150,
  email: 254,
  subject: 150,
  messageMin: 20,
  message: 3000,
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const fieldOrder: FieldName[] = ['fullName', 'organisation', 'email', 'organisationType', 'subject', 'message', 'consent'];

const fieldLabels: Record<FieldName, string> = {
  fullName: 'Full name',
  organisation: 'Organisation',
  email: 'Email address',
  organisationType: 'Organisation type',
  subject: 'Subject',
  message: 'Message',
  consent: 'Privacy consent',
};

function validateField(name: FieldName, values: FormValues): string | undefined {
  const value = values[name];
  const text = typeof value === 'string' ? value.trim() : '';

  switch (name) {
    case 'fullName':
      if (!text) return 'Please enter your full name.';
      if (text.length < 2) return 'Please enter at least 2 characters.';
      if (text.length > LIMITS.fullName) return `Please keep this under ${LIMITS.fullName} characters.`;
      return;
    case 'organisation':
      if (!text) return 'Please enter your organisation, or “Individual” if not applicable.';
      if (text.length > LIMITS.organisation) return `Please keep this under ${LIMITS.organisation} characters.`;
      return;
    case 'email':
      if (!text) return 'Please enter your email address.';
      if (text.length > LIMITS.email || !EMAIL_PATTERN.test(text)) return 'Please enter a valid email address, e.g. name@example.com.';
      return;
    case 'organisationType':
      if (!text) return 'Please select the option that best describes your organisation.';
      return;
    case 'subject':
      if (!text) return 'Please enter a subject.';
      if (text.length > LIMITS.subject) return `Please keep this under ${LIMITS.subject} characters.`;
      return;
    case 'message':
      if (!text) return 'Please enter a message.';
      if (text.length < LIMITS.messageMin) return `Please tell us a little more (at least ${LIMITS.messageMin} characters).`;
      if (text.length > LIMITS.message) return `Please keep your message under ${LIMITS.message} characters.`;
      return;
    case 'consent':
      if (!values.consent) return 'Please confirm you agree to how we handle your information.';
      return;
  }
}

function validateAll(values: FormValues): FormErrors {
  const errors: FormErrors = {};
  for (const name of fieldOrder) {
    const error = validateField(name, values);
    if (error) errors[name] = error;
  }
  return errors;
}

export function ContactForm() {
  const uid = useId();
  const id = (name: string) => `${uid}-${name}`;

  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({});
  const [state, setState] = useState<SubmitState>({ kind: 'idle' });
  const summaryRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  // A fresh object each time so repeated submits re-trigger the effect.
  const [focusRequest, setFocusRequest] = useState<{ target: 'summary' | 'status' } | null>(null);

  useEffect(() => {
    if (!focusRequest) return;
    (focusRequest.target === 'summary' ? summaryRef : statusRef).current?.focus();
  }, [focusRequest]);

  const errorList = fieldOrder.filter((f) => errors[f]);
  const submitting = state.kind === 'submitting';

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const target = e.target;
    const name = target.name as keyof FormValues;
    const value = target instanceof HTMLInputElement && target.type === 'checkbox' ? target.checked : target.value;
    const next = { ...values, [name]: value } as FormValues;
    setValues(next);
    if (name !== 'website' && touched[name]) {
      setErrors((prev) => ({ ...prev, [name]: validateField(name, next) }));
    }
    if (state.kind === 'error' || state.kind === 'unavailable') setState({ kind: 'idle' });
  }

  function handleBlur(name: FieldName) {
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, values) }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting) return;

    const nextErrors = validateAll(values);
    setErrors(nextErrors);
    setTouched(Object.fromEntries(fieldOrder.map((f) => [f, true])));

    if (Object.keys(nextErrors).length > 0) {
      setState({ kind: 'idle' });
      setFocusRequest({ target: 'summary' });
      return;
    }

    setState({ kind: 'submitting' });
    const result = await submitEnquiry({
      fullName: values.fullName.trim(),
      organisation: values.organisation.trim(),
      email: values.email.trim(),
      organisationType: values.organisationType as OrganisationType,
      subject: values.subject.trim(),
      message: values.message.trim(),
      consent: true,
      consentedAt: new Date().toISOString(),
      source: window.location.href,
      website: values.website,
    });

    if (result.status === 'sent') {
      setState({ kind: 'sent' });
      setValues(initialValues);
      setTouched({});
    } else if (result.status === 'unavailable') {
      setState({ kind: 'unavailable' });
    } else {
      setState({ kind: 'error', message: result.message });
    }
    setFocusRequest({ target: 'status' });
  }

  if (state.kind === 'sent') {
    return (
      <div className="form-status form-status--success" ref={statusRef} tabIndex={-1} role="status">
        <CheckCircle2 size={28} aria-hidden />
        <div>
          <h3>Thank you — your enquiry has been received.</h3>
          <p>We will review your message and reply to the email address you provided.</p>
          <button type="button" className="btn btn--outline btn--sm" onClick={() => setState({ kind: 'idle' })}>
            Send another enquiry
          </button>
        </div>
      </div>
    );
  }

  const describedBy = (name: FieldName, hint?: boolean) =>
    [hint ? id(`${name}-hint`) : null, errors[name] ? id(`${name}-error`) : null].filter(Boolean).join(' ') || undefined;

  const fieldClass = (name: FieldName) => `field${errors[name] ? ' field--invalid' : ''}`;

  const FieldError = ({ name }: { name: FieldName }) =>
    errors[name] ? (
      <p className="field__error" id={id(`${name}-error`)}>
        <AlertCircle size={15} aria-hidden /> {errors[name]}
      </p>
    ) : null;

  return (
    <form className="contact-form" noValidate onSubmit={handleSubmit}
      aria-describedby={isEnquiryServiceConfigured ? undefined : id('form-note')}
    >
      {!isEnquiryServiceConfigured && (
        <div className="form-notice" id={id('form-note')}>
          <Info size={18} aria-hidden />
          <p>
            Our online enquiry service is being set up. You can prepare your message here, but it cannot be sent
            yet — in the meantime, please reach us via{' '}
            <a href={company.social.linkedin} target="_blank" rel="noopener noreferrer">
              our LinkedIn company page<span className="sr-only"> (opens in a new tab)</span>
            </a>
            .
          </p>
        </div>
      )}

      {errorList.length > 0 && (
        <div className="form-errors" ref={summaryRef} tabIndex={-1} role="alert" aria-labelledby={id('errors-title')}>
          <h3 id={id('errors-title')}>Please check {errorList.length === 1 ? 'one field' : `${errorList.length} fields`}:</h3>
          <ul>
            {errorList.map((f) => (
              <li key={f}>
                <a href={`#${id(f)}`}>
                  {fieldLabels[f]}: {errors[f]}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="form-grid">
        <div className={fieldClass('fullName')}>
          <label htmlFor={id('fullName')}>
            Full name <span aria-hidden="true">*</span>
          </label>
          <input
            id={id('fullName')}
            name="fullName"
            type="text"
            autoComplete="name"
            required
            maxLength={LIMITS.fullName + 20}
            value={values.fullName}
            onChange={handleChange}
            onBlur={() => handleBlur('fullName')}
            aria-invalid={Boolean(errors.fullName)}
            aria-describedby={describedBy('fullName')}
          />
          <FieldError name="fullName" />
        </div>

        <div className={fieldClass('organisation')}>
          <label htmlFor={id('organisation')}>
            Organisation <span aria-hidden="true">*</span>
          </label>
          <input
            id={id('organisation')}
            name="organisation"
            type="text"
            autoComplete="organization"
            required
            maxLength={LIMITS.organisation + 20}
            value={values.organisation}
            onChange={handleChange}
            onBlur={() => handleBlur('organisation')}
            aria-invalid={Boolean(errors.organisation)}
            aria-describedby={describedBy('organisation')}
          />
          <FieldError name="organisation" />
        </div>

        <div className={fieldClass('email')}>
          <label htmlFor={id('email')}>
            Email address <span aria-hidden="true">*</span>
          </label>
          <input
            id={id('email')}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            maxLength={LIMITS.email}
            value={values.email}
            onChange={handleChange}
            onBlur={() => handleBlur('email')}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={describedBy('email')}
          />
          <FieldError name="email" />
        </div>

        <div className={fieldClass('organisationType')}>
          <label htmlFor={id('organisationType')}>
            Organisation type <span aria-hidden="true">*</span>
          </label>
          <div className="select-wrap">
            <select
              id={id('organisationType')}
              name="organisationType"
              required
              value={values.organisationType}
              onChange={handleChange}
              onBlur={() => handleBlur('organisationType')}
              aria-invalid={Boolean(errors.organisationType)}
              aria-describedby={describedBy('organisationType')}
            >
              <option value="">Select an option</option>
              {organisationTypes.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
          <FieldError name="organisationType" />
        </div>

        <div className={`${fieldClass('subject')} field--full`}>
          <label htmlFor={id('subject')}>
            Subject <span aria-hidden="true">*</span>
          </label>
          <input
            id={id('subject')}
            name="subject"
            type="text"
            required
            maxLength={LIMITS.subject + 20}
            value={values.subject}
            onChange={handleChange}
            onBlur={() => handleBlur('subject')}
            aria-invalid={Boolean(errors.subject)}
            aria-describedby={describedBy('subject')}
          />
          <FieldError name="subject" />
        </div>

        <div className={`${fieldClass('message')} field--full`}>
          <label htmlFor={id('message')}>
            Message <span aria-hidden="true">*</span>
          </label>
          <textarea
            id={id('message')}
            name="message"
            rows={6}
            required
            maxLength={LIMITS.message + 200}
            value={values.message}
            onChange={handleChange}
            onBlur={() => handleBlur('message')}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={describedBy('message', true)}
          />
          <p className="field__hint" id={id('message-hint')}>
            Tell us about your organisation and how you would like to collaborate.{' '}
            <span className={values.message.trim().length > LIMITS.message ? 'field__count--over' : undefined}>
              {values.message.trim().length}/{LIMITS.message}
            </span>
          </p>
          <FieldError name="message" />
        </div>

        {/* Honeypot: hidden from people and assistive technology. */}
        <div className="field--honeypot" aria-hidden="true">
          <label htmlFor={id('website')}>Website</label>
          <input
            id={id('website')}
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={values.website}
            onChange={handleChange}
          />
        </div>

        <div className={`${fieldClass('consent')} field--full field--checkbox`}>
          <input
            id={id('consent')}
            name="consent"
            type="checkbox"
            required
            checked={values.consent}
            onChange={handleChange}
            onBlur={() => handleBlur('consent')}
            aria-invalid={Boolean(errors.consent)}
            aria-describedby={describedBy('consent')}
          />
          <label htmlFor={id('consent')}>
            I agree that {company.legalName} may use the information I provide to respond to this enquiry, as
            described in the <Link to="/privacy">Privacy Policy</Link>. <span aria-hidden="true">*</span>
          </label>
          <FieldError name="consent" />
        </div>
      </div>

      <div className="contact-form__footer">
        <p className="contact-form__required">
          <span aria-hidden="true">*</span> Required field
        </p>
        <button type="submit" className="btn btn--primary" disabled={submitting} aria-disabled={submitting}>
          {submitting ? (
            <>
              <Loader2 size={18} className="spin" aria-hidden /> Sending…
            </>
          ) : (
            <>
              Send enquiry <Send size={17} aria-hidden />
            </>
          )}
        </button>
      </div>

      <div ref={statusRef} tabIndex={-1} aria-live="polite" className="form-status-region">
        {state.kind === 'unavailable' && (
          <div className="form-status form-status--warning" role="status">
            <Info size={22} aria-hidden />
            <div>
              <h3>Your enquiry has not been sent.</h3>
              <p>
                Online enquiries are not connected yet, so nothing was submitted. Your message is still in the form
                above. Please contact us through our LinkedIn company page instead.
              </p>
              <a className="btn btn--outline btn--sm" href={company.social.linkedin} target="_blank" rel="noopener noreferrer">
                Message Tyllage on LinkedIn <ArrowUpRight size={16} aria-hidden />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </div>
          </div>
        )}
        {state.kind === 'error' && (
          <div className="form-status form-status--error" role="alert">
            <AlertCircle size={22} aria-hidden />
            <div>
              <h3>Your enquiry has not been sent.</h3>
              <p>{state.message} Your message is still in the form above.</p>
            </div>
          </div>
        )}
      </div>
    </form>
  );
}
