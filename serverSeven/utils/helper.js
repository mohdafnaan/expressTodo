import fs from "fs/promises";
const db = "/home/afnaan/expressTodo/serverSeven/data.json";

async function dataContent(){
    let userData = await fs.readFile(db,"utf-8") /// JSON 
    return JSON.parse(userData); // JSON ==> Obj Array
}

async function addContent(content){
    await fs.writeFile(db,JSON.stringify(content,null,4))
}

export {dataContent,addContent};
