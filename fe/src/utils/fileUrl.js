// Helpers for uploaded files (PDFs etc.) stored in the CMS.
//
// Uploaded files have been saved in several shapes over time:
//   /uploads/pdfs/pdf-123.pdf                                      (relative, old footer uploader)
//   /api/upload/documents/doc-123.pdf                              (relative, current)
//   http://focusstockbrokers.com/api/upload/documents/doc-123.pdf  (absolute, wrong scheme)
//   https://drive.google.com/...                                   (external link)
// resolveFileUrl turns any of these into a URL that works on the current site.

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const API_ORIGIN = API_BASE_URL.replace(/\/api\/?$/, '');

const OWN_FILE_PATH = /^\/(api\/upload\/documents|uploads)\//;

/** Convert a server upload URL into a host-independent path when it points to our own files. */
export const toStoredFilePath = (url) => {
  if (!url) return '';
  try {
    const parsed = new URL(url, API_ORIGIN);
    if (OWN_FILE_PATH.test(parsed.pathname)) return parsed.pathname;
  } catch {
    /* not a URL – keep as-is */
  }
  return url;
};

/** Build a link that opens an uploaded file from the current API origin. */
export const resolveFileUrl = (stored) => {
  if (!stored) return '';
  const path = toStoredFilePath(stored.trim());
  if (path.startsWith('/')) return `${API_ORIGIN}${path}`;
  return path; // external URL (Google Drive etc.)
};
