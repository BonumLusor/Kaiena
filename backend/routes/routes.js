// import express

import express from "express";

  

// import function from controller

import { showClients, showClientById, createClient, updateClient, deleteClient } from "../controllers/clients.js";
import { showClientsRelational, showClientRelationalById, createClientRelational, updateClientRelational, deleteClientRelational, showCodClients, showCodRelational } from "../controllers/clientsRelational.js";

  

// init express router

const router = express.Router();

  

// Get All Product

router.get('/clients', showClients);
router.get('/clients_relational', showClientsRelational);
router.get('/clients_relational/cod_clients', showCodClients);
router.get('/clients_relational/cod_relational', showCodRelational);
  

// Get Single Product

router.get('/clients/:id', showClientById);
router.get('/clients_relational/:id', showClientRelationalById);

  

// Create New Product

router.post('/clients', createClient);
router.post('/clients_relational', createClientRelational);

  

// Update Product

router.put('/clients/:id', updateClient);
router.put('/clients_relational/:id', updateClientRelational);

  

// Delete Product

router.delete('/clients/:id', deleteClient);
router.delete('/clients_relational/:id', deleteClientRelational);

  

// export default router

export default router;