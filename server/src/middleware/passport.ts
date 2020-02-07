import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'

export default (googleClientId: string, googleClientSecret: string) => {
  passport.use(new GoogleStrategy(
    {
      clientID: googleClientId,
      clientSecret: googleClientSecret,
      callbackURL: '/auth/google/callback',
    },
    (accessToken, refreshToken, profile, done) => {
      done(undefined, { accessToken, refreshToken, profile })
      // User.findOrCreate({ googleId: profile.id }, function (err, user) {
      // return cb(err, user);
      // });
    }
  ))

  return passport.initialize()
}