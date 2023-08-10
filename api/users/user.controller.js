const { genSaltSync,hashSync,compareSync } = require("bcrypt");
const {create, getUserByUserId, getUsers, updateUser, deleteUser, getUserByUserEmail} = require("./user.service");
const { sign } = require("jsonwebtoken")

module.exports = {
    createUser:(req, res) => {
        const body = req.body;
        const salt = genSaltSync(10,'')
        body.password = hashSync(body.password, salt);
        create(body, (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: false,
                    message: "ERROR"
                })
            }
            return res.status(200).json({
                success: true,
                message: "SUCCESS",
                data:result
            })
        })
    },

    getUserByUserId:(req, res) => {
        const id = req.params.id;
        getUserByUserId(id, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: false,
                    message: "ERROR"
                })
            } if (!results) {
                console.log(err);
                return res.status(500).json({
                    success: false,
                    message: "Record not found!"
                })
            }
            return res.status(200).json({
                success: true,
                message: "SUCCESS",
                data:results
            })
        })
    },

    getUsers:(req, res) => {
        getUsers((err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: false,
                    message: "ERROR"
                })
            }
            return res.status(200).json({
                success: true,
                message: "SUCCESS",
                data:results
            })
        })
    },

    updateUser:(req, res) => {
        const body = req.body;
        const salt = genSaltSync(10,'')
        body.password = hashSync(body.password, salt);
        updateUser(body, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: false,
                    message: "ERROR"
                })
            }
            return res.status(200).json({
                success: true,
                message: "Update Successfully",
                data:results
            })
        })
    },

    deleteUser:(req, res) => {
        const id = req.params.id;
        deleteUser(id, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: false,
                    message: "ERROR"
                })
            }
            return res.status(200).json({
                success: true,
                message: "User deleted successfully",
                data:results
            })
        })
    },

    login: (req, res) => {
        const body = req.body;
        getUserByUserEmail(body.email, (err, results) => {
            if (err) {
                console.log(err);
            } if (!results) {
                console.log(err);
                return res.status(500).json({
                    success: false,
                    message: "Invalid email or password"
                })
            }
            const result = compareSync(body.password, results.password);
            if (result) {
                results.password = undefined;
                const jsontoken = sign({result:results}, process.env.JSON_KEY,{
                    expiresIn: "1h"
                });
                return res.status(200).json({
                    success: true,
                    message: "Login success",
                    data:jsontoken
                });
            } else {
                return res.status(500).json({
                    success: false,
                    message: "Invalid email or password",
                });
            }
        });
    }
}