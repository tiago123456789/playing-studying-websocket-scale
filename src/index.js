const app = require("./config/Server");

app.listen(process.env.PORT, function () {
    console.log("Server started on port 5000")
})
