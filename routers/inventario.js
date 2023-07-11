import dotenv from "dotenv";
import mysql from "mysql2";
import { Router } from "express";
import validateInventario from "../middleware/validateinventario.js";

const storageInventarios = Router();

dotenv.config();
let con = undefined;

storageInventarios.use((req, res, next) => {
  let conex = JSON.parse(process.env.MY_CONNECT);
  con = mysql.createPool(conex);
  next();
});


storageInventarios.post("/", validateInventario, (req, res) => {
  
  const { id_producto, id_bodega, cantidad} = req.dataInventario;

  con.query(
     `SELECT id, id_producto, id_bodega, cantidad FROM inventarios`,
    (err, data, fil) => {
      let respuesta = false;
      let cantidadTotal;
      let idMod;
      data.forEach((val, id) => {
        if (val.id_producto == id_producto && val.id_bodega == id_bodega) {
          respuesta = true;
          cantidadTotal = val.cantidad + cantidad;
          idMod = val.id;
        }
      });

      if (respuesta == true) {
        con.query(
           `UPDATE inventarios SET id_producto = ?, id_bodega = ?, cantidad = ? WHERE id = ?`,
          [id_producto, id_bodega, cantidadTotal, idMod],
          (error, data, fil) => {
            if (error) {
              console.error(error);
              res.status(500).send("Error al modificar el dato");
            } else {
              res.send("Modificado");
            }
          }
        );
      } else {
        con.query(
           `INSERT INTO inventarios (id, id_bodega, id_producto, cantidad, created_by, update_by, created_at, updated_at, deleted_at) VALUES (109, ?, ?, ?, 11, NULL, NULL, '2025-12-28 08:50:52', NULL)`,
          [id_bodega, id_producto, cantidad],
          (error, data, fil) => {
            if (error) {
              console.error(error);
              res.status(500).send("Error al ingresar el inventario");
            } else {
              res.send("ingresado con exito");
            }
          }
        );
      }
    }
  );
});

storageInventarios.put("/actualizar", (req, res) => {
  
  // datos del body
  // {
  //   "id_producto":18,
  //   "id_bodega_origen":19,
  //   "id_bodega_destino":20,
  //   "cantidad":10
  // }

  //traemos los datos pasados en el body
  const { id_producto, id_bodega_origen, id_bodega_destino, cantidad } = req.body;

  con.query(
    /*sql*/ `SELECT * FROM inventarios WHERE id_producto = ? AND id_bodega = ? OR id_producto = ? AND id_bodega = ?`,
    [id_producto, id_bodega_origen, id_producto, id_bodega_destino],

    (err, data, fil) => {
      //para ordenar la posicion en la que viene la informacion de la bodega de origen y la de destino
      let positionBodegaOrigen = 0;
      let positionBodegaDestino = 1;

      if (data[0].id_bodega != id_bodega_origen) {
        positionBodegaOrigen = 1;
        positionBodegaDestino = 0;
      }

      //saber si la bodega de origen si cuenta con la cantidad suficiente para hacer el traspaso
      if (cantidad > data[`${positionBodegaOrigen}`].cantidad) {
        res.send(
          "Error!! no se cuenta con la cantidad suficiente del producto"
        );
      } else {
        //saber si la bodega a a la que le vamos a pasar el producto ya cuenta con ese producto o no
        if (data.length != 2) {
          con.query(
            /*sql*/ `SELECT id FROM inventarios ORDER BY id DESC`,
            (errors,dataId, fil) => {
              let newId = dataId[0].id + 1;
              con.query(
                /*sql*/ `INSERT INTO inventarios (id, id_bodega, id_producto, cantidad, created_by, update_by, created_at, updated_at, deleted_at) VALUES (?, ?, ?, ?, 11, NULL, NULL, NULL, NULL)`,
                [newId,id_bodega_destino, id_producto, cantidad],
    
                (err, fil) => {
                  if (err) {
                    console.error(err);
                    res.status(500).send("Error al insertar el inventario");
                  } else {
                    let newCantidadA = data[`${positionBodegaOrigen}`].cantidad - cantidad;
                    con.query(
                      /*sql*/ `UPDATE inventarios SET cantidad = ? WHERE id = ?`,
                      [newCantidadA, data[`${positionBodegaOrigen}`].id],
    
                      (error, fil) => {
                        if (error) {
                          console.error(error);
                          res.status(500).send("Error al Modificar bodega A");
                        } else {
                          res.send(
                            "Operacion exitosa: Se movio el producto de una bodega a otra y como ese producto no existia en el inventario de la bodega de destino, se creo"
                          );
                        }
                      }
                    );
                  }
                }
              );
            }
          )
        } else {
          //modificar la cantidad del producto para poder actualizar tanto en la bodega de origen como en la de destino
          let newCantidadA = data[`${positionBodegaOrigen}`].cantidad - cantidad;
          con.query(
            /*sql*/ `UPDATE inventarios SET cantidad = ? WHERE id = ?`,
            [newCantidadA, data[`${positionBodegaOrigen}`].id],

            (error, fil) => {
              if (error) {
                console.error(error);
                res.status(500).send("Error al Modificar bodega A");
              } else {
                let newCantidadB =
                  data[`${positionBodegaDestino}`].cantidad + cantidad;
                con.query(
                  /*sql*/ `UPDATE inventarios SET cantidad = ? WHERE id = ?`,
                  [newCantidadB, data[`${positionBodegaDestino}`].id],

                  (err, fil) => {
                    if (err) {
                      console.error(err);
                      res.status(500).send("Error al Modificar bodega B");
                    } else {
                      con.query(
                        /*sql*/ `SELECT id FROM historiales ORDER BY id DESC`,
                        (errors,dataIdHidtorial, fil) => {
                          let newId = dataIdHidtorial[0].id + 1;
                          con.query(
                            /*sql*/ `INSERT INTO historiales (id, cantidad, id_bodega_origen, id_bodega_destino, id_inventario, created_by, update_by, created_at, updated_at, deleted_at) VALUES(?, ?, ?, ?, ?, 18, NULL, NULL, NULL, NULL)`,
                            [newId,cantidad, id_bodega_origen, id_bodega_destino, data[`${positionBodegaDestino}`].id],
    
                            (error, fil) => {
                              if (error) {
                                console.error(error);
                                res.status(500).send("Error al insertar historial");
                              } else {
                                res.send(
                                  "Operacion exitosa: Se movio el producto de una bodega a otra y se creo el historial"
                                );
                              }
                            }
                          );
                        }
                        )
                      
                    }
                  }
                );
              }
            }
          );
        }
      }
    }
  );
});
export default storageInventarios;