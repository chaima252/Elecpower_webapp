const express = require("express");
const app=express();
const cors=require("cors");
app.use(cors());

app.use(express.json(express.urlencoded({extended: true})))

require("dotenv").config()
require("./config/mongoose")

const port=process.env.PORT

//! ROUTES
require("./routes/Project.routes")(app)
require("./routes/Task.routes")(app)
require("./routes/ElectricalCabinet.routes")(app)
require("./routes/Material.routes")(app)
require("./routes/User.routes")(app)
require("./routes/Auth.routes")(app)



app.use((err, req, res, next) => {
    console.error(err.stack);
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal server error';
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
}
)

app.listen(port,()=>console.log(`listening on port: ${port}`))
