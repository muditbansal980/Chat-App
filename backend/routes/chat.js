const express = require("express");
const router = express.Router();
const {handlechatreceivedmess,handlechatsendedmess} = require("../controller/chat") 
router.get("/sendedmessages/:friendId",handlechatsendedmess);
router.get("/receivedmessages/:friendId",handlechatreceivedmess);
module.exports = router;