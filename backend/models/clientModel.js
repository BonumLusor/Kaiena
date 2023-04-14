// import connection

import db from "../config/database.js";

// Get All Products

export const getClients = (result) => {

    db.query("SELECT * FROM clients", (err, results) => {             

        if(err) {

            console.log(err);

            result(err, null);

        } else {

            result(null, results);

        }

    });   

}

  

// Get Single Product

export const getClientById = (id, result) => {

    db.query("SELECT * FROM clients WHERE id = ?", [id], (err, results) => {             

        if(err) {

            console.log(err);

            result(err, null);

        } else {

            result(null, results[0]);

        }

    });   

}

  

// Insert Product to Database

export const insertClient = (data, result) => {

    db.query("INSERT INTO clients SET ?", [data], (err, results) => {             

        if(err) {

            console.log(err);

            result(err, null);

        } else {

            result(null, results);

        }

    });   

}

  

// Update Product to Database

export const updateClientById = (data, id, result) => {

    db.query("UPDATE clients SET name = ?, cod_categorie_client = ? WHERE id = ?", [data.name, data.cod_categories_client, id], (err, results) => {             

        if(err) {

            console.log(err);

            result(err, null);

        } else {

            result(null, results);

        }

    });   

}

  

// Delete Product to Database

export const deleteClientById = (id, result) => {

    db.query("DELETE FROM clients WHERE id = ?", [id], (err, results) => {             

        if(err) {

            console.log(err);

            result(err, null);

        } else {

            result(null, results);

        }

    });   

}