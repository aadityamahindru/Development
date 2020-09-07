// const userDB = require("../model/user.json")
const userModel = require("../model/userModel");
async function getUser(req, res) {
    try {
        let { user_id } = req.params;
        let user = await userModel.getById(user_id);
        if(user==undefined){
            res.status(404).json({
                status: "failure",
                message:"User not found"
            })
        }
        res.status(200).json({
            status: "User Found",
            user: user
        })

    } catch (err) {
        res.status(500).json({
            sucess: "failure",
            message: err.message
        })
    }
}

async function createUser(req, res) {
    try {
        let newUser = await userModel.create(req.body);
        res.status(201).json({
            sucess: "sucessful",
            user: newUser
        })
    } catch (err) {
        res.status(500).json({
            sucess: "failure",
            message: err.message
        })
    }
}

function updateUser(req, res) {
    let { user_id } = req.params;
    let update = req.body;
    let user;
    for (let i = 0; i < userDB.length; i++) {
        if (userDB[i].user_id == user_id) {
            user = userDB[i];
            break;
        }
    }
    if (user == undefined) {
        return res.status(404).json({
            sucess: "failure",
            message: "user not found"
        })
    }
    for (let key in update) {
        user[key] = update[key];
    }
    fs.writeFileSync(path.join(__dirname, "user.json"), JSON.stringify(userDB));
    res.status(200).json({
        sucess: "sucessful",
        user: user != undefined ? user : "not found"
    })
}

function deleteUser(req, res) {
    let { user_id } = req.params;
    let i;
    let user;
    for (i = 0; i < userDB.length; i++) {
        if (userDB[i].user_id == user_id) {
            user = userDB[i];
            break;
        }
    }
    userDB.splice(i, 1);
    fs.writeFileSync(path.join(__dirname, "user.json"), JSON.stringify(userDB));
    res.status(200).json({
        sucess: "sucessful",
        user: user != undefined ? user : "not found"
    })
}
module.exports.createUser = createUser;
module.exports.getUser = getUser;
module.exports.deleteUser = deleteUser;
module.exports.updateUser = updateUser;