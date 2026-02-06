const express = require("express")
const router = express.Router();
const { handlegetsearch } = require("../controller/search")
const { handlesendfriendrequest,handlegetfriendrequests,handleaddfriend ,handlegetfriends, handlegetsentrequests,handleremovefriend } = require("../controller/search")
// const {searchmiddleware} = require("../middlewares/search")
// POST /search/friends -> protected by auth + search middleware (mounted in index.js)
// router.post("/friends",searchmiddleware ,handlesearch)

// GET /search/friends?search=term -> protected route to fetch matching friends
router.get("/friends", handlegetsearch)
router.post("/sendrequest",handlesendfriendrequest)
router.get("/getfriendrequests",handlegetfriendrequests)
router.get("/getsentrequests",handlegetsentrequests)
router.post("/addfriend",handleaddfriend)
router.get("/getfriends",handlegetfriends)
router.post("/removefriend",handleremovefriend)
module.exports = router;
