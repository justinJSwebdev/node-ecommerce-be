const userRoute = require("../routes/user.route")
const productRoute = require("../routes/product.route")
const { notFound, errHandler } = require("../middlewares/errorHandler")
const globalRoute = (app) => {
    app.use("/api/v1", userRoute);
    app.use("/api/v1/product", productRoute)
}
module.exports = globalRoute;