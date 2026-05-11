import {db} from "../db.js"



//import tasks from database (+ query parameters search and/or sort)
//Can have user_id = null (task is still valid, user has been deleted)
export const getAllTasksDb = async () => {


    const [rows] = await db.query("SELECT * FROM tasks",)
    return rows;
   

}