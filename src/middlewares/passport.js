const GoogleStrategy = require("passport-google-oauth20").Strategy;

function initializePassport(passport, port, findBySub) {
  const callbackURL =
    process.env.NODE_ENV === "production"
      ? process.env.REDIRECT_URI_PROD
      : process.env.REDIRECT_URI_DEV;
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL,
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
