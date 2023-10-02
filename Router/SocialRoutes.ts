import express from "express"


import { GoogleAuth, GoogleAuthsignin } from "../Controller/socialController"


const router =  express.Router()

router.route("/auth/google").get(GoogleAuth)
router.route("/auth/google/Callback").get(GoogleAuthsignin)


export default  router