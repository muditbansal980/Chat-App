const express = require("express")
const router = express.Router()
const {handleeditnote,handleaddnote,getnotes} = require("../controller/notes")
router.post("/addnote",handleaddnote)
router.put("/editnote/:id",handleeditnote)
router.get("/notes",getnotes)
module.exports = router;