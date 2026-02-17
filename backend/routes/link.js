const express = require("express")
const router = express.Router()
const {handleaddlink,handlegetlinks} = require("../controller/link")
router.post("/addlink",handleaddlink)
router.get("/getlinks",handlegetlinks)
module.exports = router;

