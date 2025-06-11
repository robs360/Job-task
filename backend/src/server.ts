
import mongoose from "mongoose";
import dotenv from "dotenv";
import { app } from "./app";
dotenv.config({ path: '.env.local' });
async function main() {
    try {
        
        await mongoose.connect(process.env.database_url as string);

        app.listen(process.env.port, () => {
            console.log(`server is running on port ${process.env.port}`);
        });
    } catch (error) {
        console.log(error);
    }
}
main().catch((err) => console.log(err));
