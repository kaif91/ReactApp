const passport = require('passport');

module.exports = (app) => {
  app.get(
    '/auth/google',
    passport.authenticate('google',{
    scope:['profile','email']
  }));

  app.get('/auth/google/callback',passport.authenticate('google'));

  app.get('/api/current_user',(req,res) => {
    res.send(req.user);
  });

  app.get('/api/logout', (req,res) => {
    // logout method attached to request by passport to end the session and remove the id of logged in user
    req.logout();
  })
};
