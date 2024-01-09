const mongoose = require('mongoose');

const dbConnect = async () => {
    try {
        const conn = await mongoose.connect(process.env.DB_URL)
        if (conn.connection.readyState === 1) console.log("DB connect successfully!");
        else console.log("Fail to connect");
    } catch (err) {
        console.log("Db Connection is FAIL")
        throw new Error(err)
    }
}
module.exports = dbConnect