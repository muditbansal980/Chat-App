const multer = require("multer");

function multermiddleware(req, res, next) {
    const upload = multer({ dest: "./uploads/" });
    try {
        const uploadSingle = upload.single("profilePic");
        uploadSingle(req, res, function (err) {
            if (err) {
                console.error("Multer upload error:", err);
                return res.status(500).json({ message: "File upload failed" });
            }
            console.log("File uploaded successfully:", req.file);
            console.log("File uploaded successfully its path:", req.file.path);
            next();
        });

    } catch (err) {
        console.error("Multer setup error:", err);
        return res.status(500).json({ message: "Internal Server Error" });
    }

}
module.exports = { multermiddleware }
