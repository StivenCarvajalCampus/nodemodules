var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Expose, Type, Transform } from "class-transformer";
export class user {
    //En este constructor van los nombres como estan en la base de datos 
    constructor(id, nom_com, eda) {
        this.id = id;
        this.nom_com = nom_com;
        this.eda = eda;
    }
    get nombreId() {
        return `
        ${this.id} - ${this.nom_com}`;
    }
}
__decorate([
    Expose({ name: "id" }),
    Transform(({ value }) => {
        if (Math.floor(value) && typeof value == "number")
            return Math.floor(value);
        else
            throw { status: 400, message: `EL id no cumple con lo requerido` };
    }, { toClassOnly: true })
    // (parseInt(value)) ? value :"Error ",{toClassOnly: true})
    ,
    __metadata("design:type", Number)
], user.prototype, "id", void 0);
__decorate([
    Expose({ name: "nombre" }),
    Type(() => String),
    __metadata("design:type", String)
], user.prototype, "nom_com", void 0);
__decorate([
    Expose({ name: "edad" }),
    Transform(({ value }) => parseInt(value), { toClassOnly: true }),
    __metadata("design:type", Number)
], user.prototype, "eda", void 0);
