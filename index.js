import express from"express"
import chalk from "chalk"
import { DBconnection } from "./src/DB/db.connection.js"
const app = express()
app.use(express.json())
// import { usermodel } from "./src/DB/models/user.model.js"
// import { notesmodel } from "./src/DB/models/notes.model.js"
DBconnection()

import userrouter from "./src/module/users/user.controller.js"

app.use(userrouter)





app.listen(3000,()=>{
    console.log(chalk.green("server is running successfuly"));
    
})