import express from 'express';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())

const connection = await mysql.createConnection(process.env.DATABASE_URL);

// Tabela Clientes

app.route('/clients')
    .get(async (req, res) => {
        let status = 200;
        let retVal = {};
        
        try {
            const query = 'SELECT * FROM clients ORDER BY name;';
            const [rows] = await connection.query(query);
            retVal.data = rows;
        } catch (error) {
            console.error(error);
            retVal.error = error;
            status = 500;
        }finally{
            res.status(status).json(retVal);
        }
    })
    .post (async (req, res) => {
        let data = req.body; 
        let status = 200;
				let retVal = {};

        try {
            const query = `INSERT INTO clients (name, cod_categories_client, color, city, week_days) VALUES ("${data.name}", ${data.cod_categories_client}, "${data.color}", "${data.city}", "${data.week_days}")`;
            await connection.query(query);
        } catch (error) {
            console.error(error);
            retVal.error = error;
            status = 500;
        }finally{
            res.status(status).json(retVal);
        }
    })

// Show Tabela Clients_categories

app.get('/categorie_client', async (req, res) => {
    let status = 200;
	let retVal = {};
    
	try {
		const query = 'SELECT * FROM categorie_client';
		const [rows] = await connection.query(query);
		retVal.data = rows;
	} catch (error) {
		console.error(error);
		retVal.error = error;
		status = 500;
	}finally{
		res.status(status).json(retVal);
	}
})

// show Tabela clients_relational

app.route('/clients_relational') 
		.get(async (req, res) => {
				let status = 200;
			let retVal = {};
				
			try {
				const query = 'SELECT * FROM clients_relational';
				const [rows] = await connection.query(query);
				retVal.data = rows;
			} catch (error) {
				console.error(error);
				retVal.error = error;
				status = 500;
			}finally{
				res.status(status).json(retVal);
			}
		})
		.post (async (req, res) => {
				let data = req.body; 
				let status = 200;
				let retVal = {};

				try {
						const query = `INSERT INTO clients_relational (cod_radiologist, cod_clinic, related_day) VALUES (${data.cod_radiologist}, ${data.cod_clinic}, "${data.related_day}")`;
						await connection.query(query);
				} catch (error) {
						console.error(error);
						retVal.error = error;
						status = 500;
				}finally{
						res.status(status).json(retVal);
				}
		})

// Show Tabela categorie_post

app.get('/categorie_post', async (req, res) => {
    let status = 200;
	let retVal = {};
    
	try {
		const query = 'SELECT * FROM categorie_post';
		const [rows] = await connection.query(query);
		retVal.data = rows;
	} catch (error) {
		console.error(error);
		retVal.error = error;
		status = 500;
	}finally{
		res.status(status).json(retVal);
	}
})

app.get('/clients/:id', async (req, res) => {
	let status = 200;
	let retVal = {};
	
	const {id} = req.params;
	if(isNaN(Number(id))) {
		status = 400;
		retVal.message = 'Invalid request. Please make sure the id you are searching for is a number';
		return res.status(status).json(retVal);
	}
    
	try {
		const query = 'SELECT * FROM clients WHERE clients.id=?';
		const [rows] = await connection.query(query, [id]);

		retVal.data = rows[0];
		if(!retVal.data){
			status = 404;
			retVal.message = `Couldn't find a character with id ${id}`;
		}
	} catch (error) {
		console.error(error);
		retVal.error = error;
		status = 500;
	}finally{
		res.status(status).json(retVal);
	}
});


app.listen(3001, () => {
    console.log("App is listening")
})