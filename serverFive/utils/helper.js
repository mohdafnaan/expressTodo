import fs from "fs/promises";
const db = "/home/afnaan/expressTodo/serverFive/data.json"

async function dataContent() {
    let allUsers = await fs.readFile(db,"utf-8");
    return JSON.parse(allUsers);
}

async function addContent (content){
    await fs.writeFile(db,JSON.stringify(content,null,4))
}

export {dataContent, addContent};
