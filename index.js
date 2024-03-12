import express from "express";
import ApiRoutes from "./Routes/ApiRoutes.js";
import connection from "./Services/connection.service.js";
import cors from "cors";

const app = express();
const PORT = process.env.APP_PORT;

app.use(cors());
app.use("/api", ApiRoutes);

app.listen(PORT, function(){
    console.log(`App started on port ${PORT}`);
})