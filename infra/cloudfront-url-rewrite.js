/**
 * CloudFront Function (viewer request, runtime cloudfront-js-2.0).
 *
 * Maps clean URLs to the prerendered files in the S3 bucket:
 *   /about      → /about/index.html
 *   /about/     → /about/index.html
 *   /           → /index.html
 * Requests for real files (anything with an extension) pass through unchanged.
 * It also redirects www.tyllage.com to the apex domain.
 */
// eslint-disable-next-line no-unused-vars
function handler(event) {
  var request = event.request;
  var host = request.headers.host && request.headers.host.value;

  if (host && host.indexOf('www.') === 0) {
    return {
      statusCode: 301,
      statusDescription: 'Moved Permanently',
      headers: { location: { value: 'https://' + host.slice(4) + request.uri } },
    };
  }

  var uri = request.uri;
  if (uri.endsWith('/')) {
    request.uri = uri + 'index.html';
  } else if (uri.split('/').pop().indexOf('.') === -1) {
    request.uri = uri + '/index.html';
  }
  return request;
}
