import fs from "fs/promises";


const db = "/home/afnaan/expressTodo/serverTwo/data.json";
async function readContent(){
    let userData = await fs.readFile(db,"utf-8")
    return JSON.parse(userData)
}
 
export default readContent;