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
export class bodegas {
}
__decorate([
    Expose({ name: "id" }),
    Transform(({ value }) => {
        if (Math.floor(value) && typeof value == "number")
            return Math.floor(value);
        else
            throw { status: 400, message: `Id no cumple con lo pedido` };
    }, { toClassOnly: true }),
    __metadata("design:type", Number)
], bodegas.prototype, "id", void 0);
__decorate([
    Expose({ name: "nombre" }),
    Type(() => String),
    __metadata("design:type", String)
], bodegas.prototype, "nom_bodega", void 0);
__decorate([
    Expose({ name: "id_responsable" }),
    Transform(({ value }) => {
        if (Math.floor(value) && typeof value == "number")
            return Math.floor(value);
        else
            throw { status: 400, message: `El id no esta asignado` };
    }, { toClassOnly: true }),
    __metadata("design:type", Number)
], bodegas.prototype, "id_bodega", void 0);
__decorate([
    Expose({ name: "estado" }),
    Type(() => String),
    __metadata("design:type", String)
], bodegas.prototype, "estado_bodega", void 0);
__decorate([
    Expose({ name: "cretaed_by" }),
    Transform(({ value }) => { if (Math.floor(value) && typeof value == "number")
        return Math.floor(value);
    else
        throw { status: 400, message: `el id no esta asignado` }; }, { toClassOnly: true }),
    __metadata("design:type", Number)
], bodegas.prototype, "id_responsable", void 0);
