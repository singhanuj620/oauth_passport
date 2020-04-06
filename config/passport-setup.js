const passport 		=	require("passport");
const GoogleStrategy=	require("passport-google-oauth20");
const dotenv 		=	require("dotenv");
const User 			=	require('../models/user-model');

dotenv.config();

passport.use(
	new GoogleStrategy({
		//option for strategy
		clientID: process.env.CLIENT_ID,
		clientSecret: process.env.CLIENT_SECRET,
		callbackURL:"/auth/google/redirect"
	}, (accessToken, refreshToken, profile, done) => {
		//callback function
		console.log(profile);
		new User({
			username: profile.displayName,
			googleid: profile.id
		}).save().then((newUser) => {
			console.log(newUser);
		});
	})
)