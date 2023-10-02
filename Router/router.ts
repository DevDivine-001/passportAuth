import express from "express"

import { AccountVerification, AllAccont, GetSingleAccount, OpenAccount, OpenAccountVerification }
 from "../Controller/authController"

const router = express.Router();

router.route("/open-account").post(OpenAccount)
router.route("/all-account").get(AllAccont)

router.route("/:accountID/single-account").get(GetSingleAccount)
router.route("/:token/first-mail").post(OpenAccountVerification)
router.route("/:token/verify-account").get(AccountVerification)

export default router