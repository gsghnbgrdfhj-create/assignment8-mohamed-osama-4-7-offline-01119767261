import mongoose from "mongoose";

import chalk from "chalk";

export const DBconnection = async()=>{
    try {
        await mongoose.connect("mongodb://localhost:27017/mongose")
        console.log(chalk.green("database is connected successfuly"));
        
    } catch (error) {
        console.log(chalk.red("connectin is failed"));
        
    }
}