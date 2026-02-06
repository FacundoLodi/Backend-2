import passport from "passport";
import local from "passport-local";
import jwt from "passport-jwt";

import { UsersDAO } from "../dao/mongo/users.dao.js";
import { UsersRepository } from "../repositories/users.repository.js";
import { isValidPassword } from "../utils/bcrypt.js";
import { config } from "./config.js";

const LocalStrategy = local.Strategy;
const JWTStrategy = jwt.Strategy;

const cookieExtractor = req => req?.cookies?.token || null;

const usersRepo = new UsersRepository(new UsersDAO());

export const initializePassport = () => {
  passport.use(
    "login",
    new LocalStrategy(
      { usernameField: "email" },
      async (email, password, done) => {
        try {
          const user = await usersRepo.getByEmail(email);
          if (!user) return done(null, false);
          if (!isValidPassword(user, password)) return done(null, false);
          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.use(
    "current",
    new JWTStrategy(
      {
        jwtFromRequest: cookieExtractor,
        secretOrKey: config.jwtSecret
      },
      async (payload, done) => {
        try {
          const user = await usersRepo.getById(payload.user._id);
          if (!user) return done(null, false);
          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );
};