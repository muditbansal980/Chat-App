const Todo = require("../model/todo")
async function handleadd(req,res) {
    const { event, fromtime, totime } = req.body;
    const userUid = req.cookies?.uid
    console.log("UserUID:",userUid)
    try {
        if (!event || !totime || !fromtime) {
            // Return JSON error to make API responses consistent for clients
            return res.status(406).json({ message: "All fields are required" });
        }

        await Todo.create({
            event: event,
            fromtime: fromtime,
            totime:totime,
            createdBy: req.user._id
        });

        return res.status(201).json({ message: "Todo added successfully"});
    }
    catch (err) {
        res.status(500).send("Internal Server Error:", err);
    }

}
async function handleget(req,res ){
      try {
        const todo = await Todo.find({ createdBy: req.user._id });
        return res.json(todo);
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}
module.exports = { handleadd,handleget }