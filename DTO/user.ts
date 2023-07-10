import {Expose, Type, Transform  } from "class-transformer";
export class user {
    @Expose({name:"id"})
    @Transform(({value}) => parseInt(value),{toClassOnly: true})
  
    id:number
    @Expose({name:"nombre"})
    @Type(()=>String)
    nom_com:string
    @Expose({name:"edad"})
    @Transform(({value}) => parseInt(value),{toClassOnly: true})
    eda:number
//En este constructor van los nopmbres como estan en la base de datos 
    constructor(id:number, nom_com:string, eda:number){
        this.id= id;
        this.nom_com= nom_com;
        this.eda=eda;


    }
    get nombreId():String{
        return `
        ${this.id} - ${this.nom_com}`;
    }
}