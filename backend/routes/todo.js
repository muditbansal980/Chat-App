const express = require("express")
const router = express.Router()
const {handleadd,handleget} = require("../controller/todo")
router.post("/add",handleadd)
router.get("/get",handleget)
module.exports = router;