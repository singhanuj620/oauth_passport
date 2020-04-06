const 	express			=	require('express'),
		ejs				=	require('ejs'),
		authRoutes 		=	require("./routes/auth-routes"),
		passportSetup	=	require("./config/passport-setup"),
		mongoose		=	require('mongoose'),
		dotenv			=	require('dotenv'),
		app				=	express();


dotenv.config();
app.set('view engine' , 'ejs');
app.use( express.static( "public" ) );
app.use(express.urlencoded({extended: false}));
app.use("/auth",authRoutes);

const db_url=process.env.DB_URL;
mongoose.connect(db_url,{useUnifiedTopology:true, useNewUrlParser: true},() => {
	console.log('Connected to DB');
});

app.get("/", (req,res)=>{
	res.render('index');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log("server is running at : "+port);
});