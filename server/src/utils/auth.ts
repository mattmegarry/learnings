import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

export const hashSaltPassword = (plaintextPassword: String) => {
  return bcrypt.hash(plaintextPassword, 12);
};

export const passwordMatches = (
  plaintextPassword: String,
  passwordDigest: String
) => {
  return bcrypt.compare(plaintextPassword, passwordDigest);
};

export const createToken = function(user) {
  return jwt.sign(
    {
      id: user.id
    },
    process.env.JWT_SECRET,
    {
      expiresIn: 60 * 120
    }
  );
};
