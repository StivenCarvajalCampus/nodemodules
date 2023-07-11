import {Expose, Type, Transform  } from "class-transformer";
export class user {
    @Expose({name:"id"})
    @Transform(({value}) => {if(Math.floor(value)&& typeof value == "number")return Math.floor(value); else throw {status:400, message:`EL id no cumple con lo requerido`};
    }, {toClassOnly:true})
 // (parseInt(value)) ? value :"Error ",{toClassOnly: true})
  
    id:number
    
    @Expose({name:"nombre"})
    @Type(()=>String)
    nom_com:string
    @Expose({name:"edad"})
    @Transform(({value}) => parseInt(value),{toClassOnly: true})
    eda:number
//En este constructor van los nombres como estan en la base de datos 
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