import'reflect-metadata'

//aca debemos imoprtar la clase transpilada 
import {plainToClass} from "class-transformer";
import { user } from "./controller/user.js";
let json={
    id:1,
    nombre:"Stiven",
    edad: 24,
}
let data = plainToClass(user, json , {excludeExtraneousValues: true});
console.log(data.nombreId);
console.log(JSON.stringify(data));