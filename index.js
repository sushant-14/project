const express=require('express');
const cookieParser=require('cookie-parser')
const bodyParser=require('body-parser');
const app=express();
const port=8000;
const ejslayout=require('express-ejs-layouts')
const db=require('./config/mongoose')
const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-local');
const passportGoogle=require('./config/passport-google');
const passportJWT=require('./config/passport-jwt-strategy');


const MongoStore=require('connect-mongo');
const model=require('./models/user')


app.use(cookieParser())
app.use(express.static('./assests'));
app.use(ejslayout);
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);
const router=require('./router/index')

app.use(bodyParser.urlencoded({extended:false}))


app.set('view engine','ejs');
app.set('views','./views')


app.use(session({
    name:'Codial',
    secret:'blahsomething',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    },
    store:MongoStore.create({
        mongoUrl:'mongodb://localhost/project',
        mongooseConnection:db,
        autoRemove:'disabled'
    },
    function(err){
        console.log(err || 'connect-mongodb setup')
    }

    )
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

app.use('/',router);

// app.use('/',require('./router'))

app.listen(port,function(err){
    if(err){
        console.log('error is running');
        return;
    }
    console.log('server is running on port',port);
})