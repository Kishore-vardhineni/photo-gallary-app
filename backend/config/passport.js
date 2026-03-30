const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/userModel");

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
}, async (accessToken, refreshToken, profile, done) => {
    try {
        // console.log("profile", profile);
        const email = profile.emails[0].value;

        let user = await User.findOne({
            $or: [
                { googleId: profile.id },
                { email: email }
            ]
        });

        if (!user) {
           return done(null, false, { message: "User not registered. Please signup." });
        } else {
            if (!user.googleId) {
                user.googleId = profile.id;
                user.authProvider = "google";
                user.isVerified = true;
                user.profilePic = profile.photos[0]?.value;
                await user.save();
            }
        }

        console.log("user", user)

       return done(null, user);
    } catch (err) {
        done(err, null);
    }
}));

// store user in session
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// get user from session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});