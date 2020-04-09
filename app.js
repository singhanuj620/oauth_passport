const 	express			=	require('express'),
		ejs				=	require('ejs'),
		authRoutes 		=	require("./routes/auth-routes"),
		profileRoutes 	=	require("./routes/profile-routes"),
		passportSetup	=	require("./config/passport-setup"),
		mongoose		=	require('mongoose'),
		dotenv			=	require('dotenv'),
		cookieSession 	=	require('cookie-session'),
		passport 		=	require('passport'),
		app				=	express();


dotenv.config();
app.set('view engine' , 'ejs');
app.use( express.static( "public" ) );
app.use(express.urlencoded({extended: false}));

app.use(cookieSession({
	maxAge: 24*60*60*1000,
	keys:[process.env.COOKIE_KEY]
}));

app.use(passport.initialize());
app.use(passport.session());

app.use("/auth",authRoutes);
app.use("/profile",profileRoutes);

const db_url=process.env.DB_URL;
mongoose.connect(db_url,{useUnifiedTopology:true, useNewUrlParser: true},() => {
	console.log('Connected to DB');
});

app.get("/", (req,res)=>{
	res.render('index',{user:req.user});
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log("server is running at : "+port);
});