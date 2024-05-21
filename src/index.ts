import { Request, Response } from "express";
import productRoutes from '../src/modules/products/product.route';

const mongoose = require('mongoose');
const express = require('express');
const dotenv = require('dotenv')
dotenv.config()
const cors = require('cors');
const PORT = process.env.PORT || 8000;
const app = express();
app.use(express.json());
app.use(
    cors({
        origin: ["http://localhost:5173"],
        credentials: true
    })
);

// Database connection
main().catch(err => console.log(err));

async function main() {
    try {
        mongoose.set('strictPopulate', false);
        await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASS}@cluster0.c60ctk1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`);
        console.log("=> Connected to DB");
    } catch (error) {
        console.log(error);
    }

}


// Router 
app.use('/api/products', productRoutes);

// app.use('/', router);
// app.get('/', (req:Request, res:Response) => {
//     res.send('Hello World!')
//   })

app.listen(PORT, () => {
    console.log('=> Server running on', PORT);
});