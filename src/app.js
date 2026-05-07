import express from "express"
import dotenv from "dotenv"
import taskRoutes from "./routes/taskRoutes.js"
import chatRoutes from "./routes/chatRoutes.js"
import cors from "cors"; 

dotenv.config();
const app = express()

app.use(express.json());
app.use(cors({origin:'http://127.0.0.1:5501'})); 

app.use("/api", taskRoutes); 
app.use("/api", chatRoutes); 

app.use((req, res, next) => {
  console.log("REQ:", req.method, req.url);
  next();
});

const PORT = process.env.PORT || 3000; 

app.listen(PORT,() => {
  console.log("Servidor a correr em http://localhost:3000");
});

console.log("APP LOADED");
//colocar cors