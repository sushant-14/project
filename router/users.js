const express=require('express');
const router=express.Router();
const passport=require('passport')
const userController=require('../controllers/userController')
console.log('router working');

router.get('/about/:id',passport.checkAuthentication,userController.about);
router.post('/signup',userController.create);

router.get('/sign-up',userController.signUp);
router.get('/sign-in',userController.signIn)
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect:'users/sign-in'},
),
    userController.createSession)


router.get('/sign-out',userController.destroySession);
router.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}))
router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'/users/sign-in'}),userController.createSession)

module.exports=router;