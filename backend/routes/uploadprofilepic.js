const express = require("express");
const router = express.Router();
const {handleuploadpic,handlegetuploadpic} = require("../controller/uploadprofilepic");



//<------------------- Routes ------------------->
router.post("/uploadprofile",handleuploadpic);
router.get("/getuploadprofile",handlegetuploadpic);
module.exports = router;