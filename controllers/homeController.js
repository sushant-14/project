const User=require('../models/user')
module.exports.home=function(req,res){
    User.find({},function(err,users){
        return res.render('home',{
            title:"homepage",
            all_users:users

        })

    })
}