import { Expose, Type, Transform } from "class-transformer";
export class bodegas{
    @Expose({name:"id"})
    @Transform(({value})=>{if(Math.floor(value)&& typeof value == "number")return Math.floor(value); else throw{status:400, message:`Id no cumple con lo pedido`};
}, {toClassOnly:true})
id:number
@Expose ({name:"nombre"})
@Type(()=>String)
nom_bodega:string
@Expose({name:"id_responsable"})
@Transform(({value})=>{if(Math.floor(value)&& typeof value == "number")return Math.floor(value); else throw{status : 400, message:`El id no esta asignado`};
},{toClassOnly:true})
id_bodega:number
@Expose ({name: "estado"})
@Type(()=>String)
estado_bodega:string
@Expose({name:"cretaed_by"})
@Transform(({value})=>{if(Math.floor(value)&& typeof value == "number")return Math.floor(value); else throw{status:400, message:`el id no esta asignado`};},
{toClassOnly:true})
id_responsable:number






}