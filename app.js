const 	express			=	require('express'),
		ejs				=	require('ejs'),
		app				=	express();

app.set('view engine' , 'ejs');
app.use( express.static( "public" ) );
app.use(express.urlencoded({extended: false}));

app.get("/", (req,res)=>{
	res.render('index');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log("server is running at : "+port);
});