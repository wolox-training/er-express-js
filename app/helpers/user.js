import bcrypt from 'bcryptjs';

function verifyEmail(email) {
  const verify = /^\w+([\\.-]?\w+)*@(?:|wolox)\.(?:|co)+$/;
  if (verify.test(email)) return true;
  return false;
}
function verifyPassword(pwd) {
  const password = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  if (password.test(pwd)) return true;
  return false;
}

function encriptPassword(pwd) {
  return bcrypt.hash(pwd, 15);
}

export { verifyEmail, verifyPassword, encriptPassword };
