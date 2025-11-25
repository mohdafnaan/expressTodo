import fs from "fs/promises";
const db = "/home/afnaan/expressTodo/serverFour/data.json";

async function dataContent() {
    let usersData = await fs.readFile(db,"utf-8");
    return JSON.parse(usersData)
}
async function addContent (content) {
    await fs.writeFile(db,JSON.stringify(content,null,4));
    console.log("File created");
}
export {dataContent,addContent};
