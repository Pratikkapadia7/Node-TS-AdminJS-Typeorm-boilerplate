import * as express from "express";
import initializeAdminJs from "./admin";

const app = express();

const main = async ()=>{
    //Here in the Connection, we include TypeORM Connection
    const {adminJs, adminJSRouter} = await initializeAdminJs("TypeORM_Connection");
    app.use(adminJs.options.rootPath, adminJSRouter);
}
main().catch(err => console.log(err));

app.listen(3001, ()=>{
    console.log("Server has been activated on PORT: 3001");
})