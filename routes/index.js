const userRoute = require("../routes/user.route")
const { notFound, errHandler } = require("../middlewares/errorHandler")
const globalRoute = (app) => {
    app.use("/api/v1", userRoute);

}
module.exports = globalRoute;