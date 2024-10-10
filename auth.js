// const passport = require('passport');
// const User = require('./models/user');
// const LocalStrategy = require('passport-local').Strategy;
// const bcrypt = require('bcryptjs');
// passport.use(new LocalStrategy(async (username, password, done) => {
//     console.log(username,password)
//     const user = await User.findOne({ username:username });
//     try {
//         if (!user) {
//             return done(null, false, { message: 'Invalid username' });
//         }
//         console.log(user)
//         //compare the  provided password with stored password
//         const isPasswordMatch = await bcrypt.compare(password, user.password);
//         console.log(isPasswordMatch);
//         if (isPasswordMatch) {
//             return done(null, user);
//         } else {
//             return done(null, false, { message: 'Invalid password' });
//         }
//     } catch (error) {
//         return done(error);
//     }
// }))
// module.exports = passport;