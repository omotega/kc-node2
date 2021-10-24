const allUserRecords = require("../model/database");

exports.homepage = function(req, res) {
    res.render('index');
};

exports.getAllUsers = function(req, res) {
    
    if (allUserRecords.length > 0) {
        res.status(200).send(allUserRecords);
    } else {
        res.status(404).send("No User at the moment.");
    }
};

exports.updateUser = function(req, res) {
    const id = parseInt(req.params.id);
    const user = allUserRecords.find((user, index) => {
        if (user.id === id) {
            user.dataId = index;
            return user;
        }
        else return false;
    });

    if (user) {
        let updatedUserRecord = {};
        updatedUserRecord.id = user.id;
        updatedUserRecord.name = req.body.name || user.name;
        updatedUserRecord.age = req.body.age || user.age;
        updatedUserRecord.address = req.body.address || user.address;

        updatedUserRecord.photo = req.file.path || user.photo;
        allUserRecords.splice(user.dataId, 1, updatedUserRecord);
        res.status(201).json({ success: true, data: updatedUserRecord, message: "User updated successfully" });
    } else res.status(404).json({ success: false, message: "User not found" });
};


exports.getOneUser = function(req, res) {
   
    const id = req.params.id;
    const user = allUserRecords.find(user => {
        if (user.id === Number(id)) return user;
        else return false;
    });
    if (user) res.status(200).send(user);
    else res.status(404).send("User not found");
};

exports.deleteUser = function(req, res) {
    const id = parseInt(req.params.id);

    
    const user = allUserRecords.find((user, index) => {

        if (user.id === id) {
            
            user.dataId = index;
           
            return user;
        } else {
            return false;
        }
    });

    if (user) {
        
        allUserRecords.splice(user.dataId, 1);
        res.status(200).send({ succes: true, data: user, message: "User deleted successfully" });
    } else res.status(404).json({ success: false, message: "User not found" });
};


exports.createUser = function(req, res) {
    
    const { name, address, age } = req.body;
    if (name && address && age) {
        let id = 1000;
        if (allUserRecords.length > 0) id = allUserRecords[allUserRecords.length - 1].id + 1;
        req.body.id = id;
        allUserRecords.push(req.body);
        res.status(201).json({ success: true, data: req.body });
    } else {
        res.status(400).json({ success: false, message: "Bad input" });
    }
};