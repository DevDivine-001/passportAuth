import express, { Application, NextFunction, Response } 
from "express"
import cors from "cors"
import passport from "passport"
import cookieSession from "cookie-session"
import  jwt  from "jsonwebtoken"
import auth from "./Router/router"
const port: number = 4041;
const app: Application = express();

app.use(cors({ origin: "*"}))
app.use(express.json());

passport.serializeUser((user, done)=>{
    done(null, user)
});
passport.deserializeUser((user, done)=>{
    done(null, user!)
});

app.use(
    cookieSession({
        name: `${process.env.SESSION_NAME}`,
        keys: [`${process.env.SESSION_KEY}`],
        maxAge: 2 * 60 * 100,
    })
)
.use((req:any, res:Response, next: NextFunction)=>{
    if(req.session && !req.session.regenerate){
 req.session.save = (cd: any) =>{
    cd();
 }
    }
    if(req.session && !req.session.save){
        req.session.save = (cd: any) =>{
            cd();
        };
    }
    next();
})
.use(passport.initialize())
.use(passport.session());

app.get
("/auth/google/callback",passport.authenticate(
    "google",{failureRedirect: "/login"}),

function (req, res){
    const user: any = req.user;
    
    const token = jwt.sign({id:user.id, email: user.email},
         "secret");
    
    res.status(200).json({
        message: "WelCome to....!🚀🧑‍🚀🧑‍🚀🧑‍🚀🧑‍🚀🧑‍🚀",
        data: token
    })
}
)

app.use("/api",auth);
app.listen(port,()=>{
    console.log()
    console.log("Auth Service is Connected to Server...🚀🚀🚀🚀🚀🚀🚀")
});

