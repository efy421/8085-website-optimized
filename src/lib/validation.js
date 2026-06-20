// Task 7.4: Server-side Input Validation
const LIMITS = {NAME:{min:2,max:100}, EMAIL:{max:254}, COMPANY:{min:2,max:200}, QUERY:{min:10,max:2000}, EMPLOYEE:{min:1,max:1000000}};
const error = (type, field, msg) => ({ type, field, message: msg });

export const validateEmail = (email) => {
  if (!email) return { valid: false, errors: [error('REQUIRED', 'email', 'Email required')] };
  const clean = email.trim().toLowerCase();
  const errors = [];
  if (clean.length > LIMITS.EMAIL.max) errors.push(error('LENGTH', 'email', 'Email too long'));
  if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(clean)) errors.push(error('FORMAT', 'email', 'Invalid email'));
  return { valid: !errors.length, errors, value: !errors.length ? clean : null };
};

export const validateName = (name) => {
  if (!name) return { valid: false, errors: [error('REQUIRED', 'name', 'Name required')] };
  const clean = name.trim();
  const errors = [];
  if (clean.length < LIMITS.NAME.min) errors.push(error('LENGTH', 'name', 'Name too short'));
  if (clean.length > LIMITS.NAME.max) errors.push(error('LENGTH', 'name', 'Name too long'));
  if (!/^[a-zA-Z\u00C0-\u024F\u1E00-\u1EFF\s'\-.]+$/.test(clean)) errors.push(error('FORMAT', 'name', 'Invalid characters'));
  return { valid: !errors.length, errors, value: !errors.length ? clean : null };
};

export const validateCompany = (company) => {
  if (!company) return { valid: false, errors: [error('REQUIRED', 'company', 'Company required')] };
  const clean = company.trim();
  const errors = [];
  if (clean.length < LIMITS.COMPANY.min) errors.push(error('LENGTH', 'company', 'Too short'));
  if (clean.length > LIMITS.COMPANY.max) errors.push(error('LENGTH', 'company', 'Too long'));
  return { valid: !errors.length, errors, value: !errors.length ? clean : null };
};

export const validateQuery = (query) => {
  if (!query) return { valid: false, errors: [error('REQUIRED', 'query', 'Query required')] };
  const clean = query.trim();
  const errors = [];
  if (clean.length < LIMITS.QUERY.min) errors.push(error('LENGTH', 'query', 'Too short'));
  if (clean.length > LIMITS.QUERY.max) errors.push(error('LENGTH', 'query', 'Too long'));
  return { valid: !errors.length, errors, value: !errors.length ? clean : null };
};

export const validateEmployeeCount = (count) => {
  if (!count && count !== 0) return { valid: false, errors: [error('REQUIRED', 'employeeCount', 'Count required')] };
  const num = parseInt(count);
  const errors = [];
  if (isNaN(num)) errors.push(error('FORMAT', 'employeeCount', 'Must be number'));
  if (num < LIMITS.EMPLOYEE.min) errors.push(error('RANGE', 'employeeCount', 'Too small'));
  if (num > LIMITS.EMPLOYEE.max) errors.push(error('RANGE', 'employeeCount', 'Too large'));
  return { valid: !errors.length, errors, value: !errors.length ? num : null };
};

export const validateAllFields = (data) => {
  const results = {
    name: validateName(data.name),
    email: validateEmail(data.email), 
    company: data.company ? validateCompany(data.company) : {valid:true},
    query: data.query ? validateQuery(data.query) : {valid:true},
    employeeCount: data.employeeCount ? validateEmployeeCount(data.employeeCount) : {valid:true}
  };
  const allErrors = Object.values(results).flatMap(r => r.errors || []);
  return { valid: allErrors.length === 0, errors: allErrors, results };
};
