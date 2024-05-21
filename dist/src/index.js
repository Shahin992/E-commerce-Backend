"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_route_1 = __importDefault(require("../src/modules/products/product.route"));
const mongoose = require('mongoose');
const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const PORT = process.env.PORT || 8000;
const app = express();
app.use(express.json());
app.use(cors({
    origin: ["http://localhost:5173"],
    credentials: true
}));
// Database connection
main().catch(err => console.log(err));
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            mongoose.set('strictPopulate', false);
            yield mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASS}@cluster0.c60ctk1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`);
            console.log("=> Connected to DB");
        }
        catch (error) {
            console.log(error);
        }
    });
}
// Router 
app.use('/api/products', product_route_1.default);
// app.use('/', router);
// app.get('/', (req:Request, res:Response) => {
//     res.send('Hello World!')
//   })
app.listen(PORT, () => {
    console.log('=> Server running on', PORT);
});
