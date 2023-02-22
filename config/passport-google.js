const passport = require("passport");

const googleStrategy=require('passport-google-oauth').OAuth2Strategy;
const crypto=require('crypto');
const User=require('../models/user');

passport.use(new googleStrategy({
    clientID:'539540416168-evvgg7uitelibpo8fkq3tv9jcj784t6b.apps.googleusercontent.com',
    clientSecret:'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',
    callbackURL:'http://localhost:8000/users/auth/google/callback'
},
function(accessToken,refreshToken,profile,done){
    User.findOne({email:profile.emails[0].value}).exec(function(err,user){
        if(err){
            console.log('error in google passport',err);
            return;
        }
        console.log(profile);
        if(user){
            return done(null, user);
        }else{
            User.create({
                name:profile.displayName,
                email:profile.emails[0].value,
                password:crypto.randomBytes(20).toString('hex')
            },
            function(err,user){
                if(err){
                    console.log('error in create google passport',err);
                    return;
                }
                return done(null,user)
            })
        }
    })
}

))

module.exports=passport;