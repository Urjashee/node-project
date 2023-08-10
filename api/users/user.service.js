const pool = require("../../config/database")

module.exports = {
    create: (data, callBack) => {
        pool.query(
            `insert into registration(firstName, lastName, gender, email, password, number) 
                            values(?,?,?,?,?,?)`,
            [
                data.first_name,
                data.last_name,
                data.gender,
                data.email,
                data.password,
                data.number
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },

    getUsers: callBack => {
        pool.query(
            `select id, firstName, lastName, gender, email, password, number FROM registration`,
            [],
            (error, results, field) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
        }
        )
    },

    getUserByUserId: (id, callBack) => {
        pool.query(
            `select id, firstName, lastName, gender, email, password, number FROM registration where id = ?`,
            [id],
            (error, results, field) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results[0])
            }
        )
    },

    updateUser: (data, callBack) => {
        pool.query(
            `update registration set firstName=?, lastName=?, gender=?, email=?, password=?, number=? where id = ?`,
            [
                data.first_name,
                data.last_name,
                data.gender,
                data.email,
                data.password,
                data.number,
                data.id
            ],
            (error, results, field) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results[0])
            }
        )
    },

    deleteUser: (id, callBack) => {
        pool.query(
            `delete from registration where id = ?`,
            [id],
            (error, results, field) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results[0])
            }
        )
    },

    getUserByUserEmail: (email, callBack) => {
        pool.query(
            `select * FROM registration where email = ?`,
            [email],
            (error, results, field) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results[0])
            }
        )
    },
}