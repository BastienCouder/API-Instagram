const passport = require("passport");
const UserModel = require("../models/user.model");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.OAUTH2_CLIENT_ID,
      clientSecret: process.env.OAUTH2_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
      scope: ["profile", "email"],
    },
    async (accessToken, refreshToken, profile, cb) => {
      try {
        const { id, displayName, emails } = profile;
        const email = emails[0].value;

        const user = await UserModel.findOne({ googleId: id });

        if (user) {
          return cb(null, user);
        } else {
          const defaultPseudo = await generateDefaultPseudo(displayName);

          const newUser = new UserModel({
            googleId: id,
            pseudo: defaultPseudo,
            email: email,
          });

          await newUser.save();
          return cb(null, newUser);
        }
      } catch (err) {
        return cb(err);
      }
    }
  )
);

async function generateDefaultPseudo(displayName) {
  let pseudo = displayName.toLowerCase().replace(/\s+/g, "");
  let count = 0;

  while (await UserModel.findOne({ pseudo })) {
    count++;
    pseudo = displayName.replace(/\s+/g, "") + count;
  }

  return pseudo;
}

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await UserModel.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});
