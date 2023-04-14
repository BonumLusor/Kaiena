// import connection

import db from "../config/database.js"; 

// Get All Products

export const getClientsRelational = (result) => {

    db.query("SELECT * FROM clients_relational", (err, results) => {             

        if(err) {

            console.log(err);

            result(err, null);

        } else {

            result(null, results);

        }

    });   

}

  

// Get Single Product

export const getClientRelationalById = (id, result) => {

    db.query("SELECT * FROM clients_relational WHERE id = ?", [id], (err, results) => {             

        if(err) {

            console.log(err);

            result(err, null);

        } else {

            result(null, results[0]);

        }

    });   

}

  

// Insert Product to Database

export const insertClientRelational = (data, result) => {

    db.query(`INSERT INTO clients_relational SET ?` [data.cod_clients, data.cod_relational], (err, results) => {             

        if(err) {

            console.log(err);

            result(err, null);

        } else {

            result(null, results);

        }

    });   

}

  

// Update Product to Database

export const updateClientRelationalById = (data, id, result) => {

    db.query("UPDATE clients_relational SET cod_clients = ?, cod_relational = ? WHERE id = ?", [data.name, data.cod_client, data.cod_relational, id], (err, results) => {             

        if(err) {

            console.log(err);

            result(err, null);

        } else {

            result(null, results);

        }

    });   

}

  

// Delete Product to Database

export const deleteClientRelationalById = (id, result) => {

    db.query("DELETE FROM clients_relational WHERE id = ?", [id], (err, results) => {             

        if(err) {

            console.log(err);

            result(err, null);

        } else {

            result(null, results);

        }

    });   

}

 export const getCodClients = (result) => {

    db.query("SELECT cod_clients FROM Clients_relational", (err, results) => {             

        if(err) {

            console.log(err);

            result(err, null);

        } else {

            result(null, results);

        }

    });  

} 

export const getCodRelational = (result) => {

    db.query("SELECT cod_relational FROM Clients_relational", (err, results) => {             

        if(err) {

            console.log(err);

            result(err, null);

        } else {

            result(null, results);

        }

    });  

} 