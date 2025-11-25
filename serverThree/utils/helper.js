import fs from "fs/promises";

const db = "/home/afnaan/expressTodo/serverThree/data.json";

async function dataContent() {
    let userData = await fs.readFile(db,"utf-8");
    return JSON.parse(userData);
}
export default dataContent;