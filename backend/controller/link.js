const Link = require("../model/link");


async function handleaddlink(req, res) {
    const { title, link } = req.body;
    const userUid = req.cookies?.uid;
    
    console.log("cookie uid:-", userUid)
    try {
        if (!title || !link) {
            // Return JSON error to make API responses consistent for clients
            return res.status(406).json({ message: "All fields are required" });
        }

        await Link.create({

            title: title,
            link: link,
            createdBy: req.user._id
        });
        return res.status(201).json({ message: "Link added successfully", title: title, link: link, createdBy: req.user._id });
    }
    catch (err) {
        res.status(500).send("Internal Server Error:", err);
    }
}
async function handlegetlinks(req, res) {
    try {
        const link = await Link.find({ createdBy: req.user._id });
        return res.json(link);
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}
module.exports={handleaddlink,handlegetlinks}
