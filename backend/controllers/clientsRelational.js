// Import function from Product Model
import { getClientsRelational, getClientRelationalById, insertClientRelational, updateClientRelationalById, deleteClientRelationalById, getCodClients, getCodRelational } from "../models/clientRelationalModel.js";
  
// Get All Products
export const showClientsRelational = (req, res) => {
    getClientsRelational((err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}
  
// Get Single Product 
export const showClientRelationalById = (req, res) => {
    getClientRelationalById(req.params.id, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}
  
// Create New Product
export const createClientRelational = (req, res) => {
    const data = req.body;
    insertClientRelational(data, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}
  
// Update Product
export const updateClientRelational = (req, res) => {
    const data  = req.body;
    const id    = req.params.id;
    updateClientRelationalById(data, id, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}
  
// Delete Product
export const deleteClientRelational = (req, res) => {
    const id = req.params.id;
    deleteClientRelationalById(id, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}

export const showCodClients = (req, res) => {
    getCodClients((err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}

export const showCodRelational = (req, res) => {
    getCodRelational((err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}