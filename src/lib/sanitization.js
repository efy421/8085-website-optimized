import DOMPurify from 'dompurify';

// Task 7.3: XSS Prevention Core
const textOnlyConfig = { ALLOWED_TAGS: [], ALLOWED_ATTR: [] };

export const sanitizeText = (input, maxLength = 1000) => {
  if (!input || typeof input !== 'string') return '';
  return DOMPurify.sanitize(input.trim(), textOnlyConfig).substring(0, maxLength);
};

export const sanitizeName = (name) => {
  if (!name) return '';
  const clean = sanitizeText(name, 100);
  return clean.replace(/[^a-zA-Z\u00C0-\u024F\u1E00-\u1EFF\s'\-\.]/g, '');
};

export const sanitizeEmail = (email) => {
  if (!email) return '';
  const clean = sanitizeText(email.toLowerCase(), 254);
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  return emailRegex.test(clean) ? clean : '';
};

export const sanitizeCompany = (company) => {
  if (!company) return '';
  const clean = sanitizeText(company, 200);
  return clean.replace(/[^a-zA-Z0-9\u00C0-\u024F\u1E00-\u1EFF\s&\-\.\,\(\)\'\"]/g, '');
};

export const sanitizeQuery = (query) => {
  if (!query) return '';
  return sanitizeText(query, 2000)
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/javascript:|vbscript:|on\w+\s*=|eval\s*\(/gi, '');
};

export const sanitizeEmployeeCount = (count) => {
  const num = parseInt(count);
  return (!isNaN(num) && num >= 1 && num <= 1000) ? num : null;
};

export const sanitizeCollectedData = (data) => ({
  name: data?.name ? sanitizeName(data.name) : null,
  email: data?.email ? sanitizeEmail(data.email) : null,
  query: data?.query ? sanitizeQuery(data.query) : null,
  company: data?.company ? sanitizeCompany(data.company) : null,
  employeeCount: data?.employeeCount ? sanitizeEmployeeCount(data.employeeCount) : null,
  conversationId: data?.conversationId ? sanitizeText(data.conversationId, 100) : null
});

export const formatSafeDisplayValue = (key, value) => {
  if (!value) return '';
  if (key === 'employeeCount') return `${value} employees`;
  return sanitizeText(String(value));
};

// Validation patterns for input checking
export const VALIDATION_PATTERNS = {
  name: /^[a-zA-Z\u00C0-\u024F\u1E00-\u1EFF\s'\-\.]{1,100}$/,
  email: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
  company: /^[a-zA-Z0-9\u00C0-\u024F\u1E00-\u1EFF\s&\-\.\,\(\)\'\"]{1,200}$/,
  query: /^.{1,2000}$/,
  employeeCount: /^[1-9]\d{0,6}$/
};

export const validateInput = (key, value) => {
  if (!value) return false;
  const pattern = VALIDATION_PATTERNS[key];
  return pattern ? pattern.test(String(value)) : true;
};
