const User=require('../models/user')



module.exports.signUp=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/about')
    }
    return res.render('sign_up',{
        title:'Sign Up page'
    })
}

module.exports.signIn=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/about')
    }
    return res.render('sign_in',{
        title:'Sign In page'
    })
}

module.exports.about=function(req,res){
    User.findById(req.params.id,function(err,user){
        console.log('user',user);
        return res.render('about',{
            title:"about page",
            profile_user:user
        })
    })
}


module.exports.create=function(req,res){
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back')
    }
    User.findOne({email:req.body.email},function(err,user){
        if(err){
            console.log('error in finding user sign in')
            return;
        }
        if(!user){
            User.create(req.body,function(err,user){
                if(err){
                    console.log('error in creating');
                    return;
                }
                return res.redirect('/users/sign-in')
            })
        }
        else{
            return res.redirect('back')
        }
    })
}

module.exports.createSession=function(req,res){
    return res.redirect('/')
}

module.exports.destroySession=function(req,res){
    req.logout(function(err){
        if(err){
            return next(err);
        }
        res.redirect('/')
    })
}
