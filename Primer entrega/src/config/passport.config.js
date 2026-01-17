import passport from "passport";
import local from "passport-local";
import jwt from "passport-jwt";
import { UserModel } from "../models/user.model.js";
import { createHash, isValidPassword } from "../utils/bcrypt.js";

const LocalStrategy = local.Strategy;
const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;

export const initializePassport = () => {

  passport.use(
    "register",
    new LocalStrategy(
      {
        passReqToCallback: true,
        usernameField: "email"
      },
      async (req, email, password, done) => {
        try {
          const { first_name, last_name, age } = req.body;

          const exists = await UserModel.findOne({ email });
          if (exists) return done(null, false);

          const user = await UserModel.create({
            first_name,
            last_name,
            email,
            age,
            password: createHash(password)
          });

          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.use(
    "login",
    new LocalStrategy(
      { usernameField: "email" },
      async (email, password, done) => {
        try {
          const user = await UserModel.findOne({ email });
          if (!user) return done(null, false);

          if (!isValidPassword(user, password)) {
            return done(null, false);
          }

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
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: "coderSecret"
      },
      async (jwt_payload, done) => {
        return done(null, jwt_payload.user);
      }
    )
  );
};