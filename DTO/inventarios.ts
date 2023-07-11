import { Expose, Type, Transform } from "class-transformer";

export class inventarios{
    @Expose({name: "producto"})
    @Transform(({value})=>parseInt(value),{toClassOnly:true})
    id_producto:number;
    @Expose({name:"bodega"})
    @Transform(({value})=>parseInt(value),{toClassOnly:true})
    id_bodega:number;
    @Expose({name:"cantidad"})
    @Transform(({value})=>parseInt(value),{toClassOnly:true})
    cantidad:number;
    constructor(id_producto: number, id_bodega: number, cantidad: number){
        this.id_producto = id_producto;
        this.id_bodega = id_bodega;
        this.cantidad = cantidad;
    }


}