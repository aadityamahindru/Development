const express=require("express");
const passport=require("passport");
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
const app=express();
const util=require("util");
const mysql = require('mysql');
const uniqid = require('uniqid');
app.use(express.static('public'));
//==============database connection===============

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Aaditya7$",
  database: 'insta_pp'
});
connection.connect();
let query = util.promisify(connection.query).bind(connection);



// req will be send through browser
// start 
app.use(passport.initialize());                            // google auth
app.use(passport.session());

passport.serializeUser((user,done)=>{
    done(null,user.gmail_id);
})
passport.deserializeUser(async (gmail_id,done)=>{
    let resArr = await query(`SELECT * from user WHERE gmail_id="${gmail_id}"`);
    if (resArr.length == 0) {
        done(null, "user not found")
    } else {
        done(null, resArr[0])
    }
})
// defining setting
passport.use(new GoogleStrategy({
    clientID:"387121863690-mr34t9ear2jnjld0fv3ubi9th9085jdl.apps.googleusercontent.com",
    clientSecret: "uIohKr1UMBMV1Vv2xeoSthlF",
    callbackURL: "http://localhost:4000/auth/callback",
    passReqToCallback   : true
  },
  async function(request, accessToken, refreshToken, profile, done) {
    console.log(profile);
    let resArr=await query(`SELECT * FROM user WHERE gmail_id="${profile.id}"`)
    let user={};
    if(resArr.length==0){
       user={
        gmail_id:profile.id,
        p_img_url:profile.picture,
        email_id:profile.email,
        name:profile.given_name,
        id:uniqid()
       }
       await query(`INSERT INTO user SET?`,user);
    }else{
        user=resArr[0];
    }
    done(null,user);
  }
));

// req to google server => to get email  and profile
// passport .authectiecte => function google [email,profile],/setting
// redirect to googl server
app.get('/auth/google',passport.authenticate('google', { scope:[ 'email', 'profile' ] }));
// req from google server
// authenticate=> 
app.get("/auth/callback", passport.authenticate("google"), function (req, res) {
    //identify 
    // req using passport.authenticate
    res.send("user authenticated");
})



const userRouter=require("./router/userRouter");
const postRouter=require("./router/postRouter");

// create ==> post
app.use(express.static('public'));
app.use(express.json());

app.use("/api/v1/users",userRouter);
app.use("/api/v1/posts",postRouter);

app.listen(4000, function () {
    console.log("Server is listening at port 4000");
})