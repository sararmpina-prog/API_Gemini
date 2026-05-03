import express from "express"
import dotenv from "dotenv"
import taskRoutes from "./routes/taskRoutes.js"
import chatRoutes from "./routes/chatRoutes.js"

dotenv.config();
const app = express()

app.use(express.json());

app.use("/api", taskRoutes); 
app.use("/api", chatRoutes); 

const PORT = process.env.PORT || 3000; 

app.listen(PORT,() => {
  console.log("Servidor a correr em http://localhost:3000");
});

console.log("APP LOADED");
//colocar cors