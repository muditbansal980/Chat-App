const Note = require("../model/notes");

// <------------------Add Note-------------------->    
async function handleaddnote(req, res) {
    const { title, content } = req.body;
    const userUid = req.cookies?.uid;
    
    console.log("cookie uid:-", userUid)
    try {
        if (!title || !content) {
            // Return JSON error to make API responses consistent for clients
            return res.status(406).json({ message: "All fields are required" });
        }

        await Note.create({

            title: title,
            content: content,
            createdBy: req.user._id
        });
        
        return res.status(201).json({ message: "Note added successfully", title: title, content: content, createdBy: req.user._id });

    }
    catch (err) {
        res.status(500).send("Internal Server Error:", err);
    }
}


async function getnotes(req, res) {
    try {
        const notes = await Note.find({ createdBy: req.user._id });
        return res.json(notes);
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}
async function handleeditnote(req,res){
    const {title,content}= req.body;
    console.log("Title",title);
    const noteId = req.params.id;
    try{
        if(!title || !content){
            return res.status(406).json({message:"All fields are required"});
        }
        const note = await Note.findByIdAndUpdate(noteId, { title, content }, { new: true });

        if(!note){
            return res.status(404).json({message:"Note not found"});
        }
        // await note.save();
        return res.status(200).json({message:"Note updated successfully"});
    }
    catch(err){
        console.error("Error editing note:",err);
        return res.status(500).json({message:"Internal Server Error"});
    }
}

module.exports = { handleaddnote, getnotes, handleeditnote };