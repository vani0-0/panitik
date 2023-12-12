const GoogleStrategy = require("passport-google-oauth20").Strategy;

function initializePassport(passport, port, findBySub) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: `http://localhost:${port}/auth/google/callback`,
      },
      async function (accessToken, refreshToken, profile, cb) {
        const user = await findBySub(profile._json);
        if (!user) {
          return cb(null, false, { message: "Google account not signed up." });
        }
        console.log(user);
        return cb(null, { ...profile._json, role: user.role });
      }
    )
  );

  passport.serializeUser((user, done) => {
    console.log(`/n ==> Serialize User: ${JSON.stringify(user)}`);
    done(null, user);
  });
  passport.deserializeUser((user, done) => {
    console.log(`/n ==> Deserialize User: ${JSON.stringify(user)}`);
    done(null, user);
  });
}

module.exports = initializePassport;
