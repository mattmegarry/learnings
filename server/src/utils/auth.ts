import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { getConnection } from "typeorm";
import { User } from "../entity/User";

export const hashSaltPassword = (plaintextPassword: String) => {
  return bcrypt.hash(plaintextPassword, 12);
};

export const passwordMatches = (
  plaintextPassword: String,
  passwordDigest: String
) => {
  return bcrypt.compare(plaintextPassword, passwordDigest);
};

export const createToken = function(userId) {
  return jwt.sign(
    {
      id: userId
    },
    process.env.JWT_SECRET,
    {
      expiresIn: 60 * 120
    }
  );
};

export const authorization = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  let token;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.slice(7, authHeader.length).trim();
  } else {
    return res.status(401).end();
  }

  if (token) {
    const userId = jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).end();
      } else {
        const userId = decoded.id;
        return userId;
      }
    });
    const userRepository = getConnection().getRepository(User);
    const user = await userRepository.findOne({ id: userId });
    if (user) {
      if (req.params.userId !== user.id) {
        return res.status(401).end();
      }
      res.locals.authorizedUser = user;
      next();
    } else {
      return res.status(401).end();
    }
  } else {
    return res.status(401).end();
  }
};
