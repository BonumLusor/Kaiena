// Import function from Product Model
import { getClients, getClientById, insertClient, updateClientById, deleteClientById } from "../models/clientModel.js";
  
// Get All Products
export const showClients = (req, res) => {
    getClients((err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}
  
// Get Single Product 
export const showClientById = (req, res) => {
    getClientById(req.params.id, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}
  
// Create New Product
export const createClient = (req, res) => {
    const data = req.body;
    insertClient(data, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}
  
// Update Product
export const updateClient = (req, res) => {
    const data  = req.body;
    const id    = req.params.id;
    updateClientById(data, id, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}
  
// Delete Product
export const deleteClient = (req, res) => {
    const id = req.params.id;
    deleteClientById(id, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}