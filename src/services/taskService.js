import {db} from "../db.js"



//import tasks from database (exceptions in controller)
export const getAllTasksDb = async () => {


    const [rows] = await db.query("SELECT * FROM tasks",)
    return rows;
   

}