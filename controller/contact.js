const path = require("path");
const db = require('../model/database');
exports.processForm = (req, res) => {

    const { firstName, lastName, message } = req.body;
    console.log(req.body);
    if (!firstName || !lastName || !message) {
        res.status(422).json({ ok: false, message: "Please fill all fields" })
    } else {
        db.contactDatabase.push({ firstName, lastName, message });

        res.status(201).json({ ok: true, message: "Message sent!" })
    }
};