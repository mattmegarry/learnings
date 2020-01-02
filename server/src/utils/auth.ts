import * as bcrypt from "bcrypt";

export const hashSaltPassword = (plaintextPassword: String) => {
  return bcrypt.hash(plaintextPassword, 12);
};
