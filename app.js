// Módulos requeridos
const express = require('express');
const http = require('http');
const helmet = require('helmet');
var compression = require('compression');
require('dotenv').config();
const {v4: uuidv4} = require('uuid');
const cors = require('cors');

const app = express();
app.use(helmet()); // Ayuda a proteger aplicaciones Express
app.use(compression());
app.use(cors());

// Servidor HTTP
const serverHttp = http.createServer(app);
serverHttp.listen(process.env.HTTP_PORT, process.env.IP);

// Contenido estático
app.use(express.static('./public'));

// API
app.get('/api/get-uuid', function(req, res) {
    res.send(uuidv4())
});

app.get('/tmp', function(req,res){
    const options =  {
	host: 'google.com',
	path: '/'
    };
    const request = http.request(options, function(r){
	let data = '';
	r.on('data', function (chunk){
		data += chunk;
	});
	r.on('end', function (){
        	throw new Error();
        });
    });
    request.on('error', function (e){
	res.send('err');
    });
    request.end();
});

// 404
app.get('*', function(req, res) {
    res.status(404).send('Error 404 - Recurso no encontrado')
});


