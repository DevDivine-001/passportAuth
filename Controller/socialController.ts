import { Request, Response } from "express"

import passport from "passport"
import "../Utils/Social"

export const GoogleAuth =async () => {
    await passport.authenticate("google", {scope:['profile', 'email']});
};

export const GoogleAuthsignin = async () => {
    passport.authenticate("google", {failureRedirect:"/login"})
    async(req: Request, res:Response)=>{
        const user = req.user;
        res.status(200).json({
            message:"WelCome to....!🚀🧑‍🚀🧑‍🚀🧑‍🚀🧑‍🚀🧑‍🚀",
            data: user,
        })
    }
}
// export const GitHubAuth = async () => {
//     passport.authenticate("")
// }