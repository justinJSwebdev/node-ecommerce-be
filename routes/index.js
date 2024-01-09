const userRoute = require("../routes/user.route")

const globalRoute = (app) => {
    app.use("/api/v1/", userRoute);
}
module.exports = globalRoute;