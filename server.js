const sql = require('mssql')
const config = {
	user: 'DB_A422CF_ARES_admin',
	password: 'razors1805',
	server: 'sql5003.site4now.net', 
	database: 'DB_A422CF_ARES' 
};

var express = require("express");
var app = express();
const PORT = process.env.PORT || 3001;

var router = express.Router();
var bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use(express.static('app'));

var path = __dirname + '/'

//manejador de rutas
router.use(function (req,res,next) {
  console.log("/" + req.method);
  next();
});

app.get("/",function(req,res){
	res.sendFile(path + 'app/index.html');
});

app.get("/api/productos/all", async(req,res)=>{
	
		//var filtro = req.query.filtro;
		//console.log(filtro);
		console.log('cargando datos..')
	
		var fila = '';
		
	sql.connect(config, err => {
		    // ... error checks
		    var strSql = '';
			
			//strSql = "SELECT PRECIOS.CODPROD, PRODUCTOS.DESPROD, PRECIOS.CODMEDIDA, CONCAT('Q ' , CONVERT(money,PRECIOS.PRECIO )) as PRECIO FROM PRECIOS LEFT OUTER JOIN PRODUCTOS ON PRECIOS.CODPROD = PRODUCTOS.CODPROD AND PRECIOS.EMPNIT = PRODUCTOS.EMPNIT WHERE PRODUCTOS.DESPROD LIKE '%" + filtro + "%'";
			strSql = "SELECT PRECIOS.CODPROD, PRODUCTOS.DESPROD, PRECIOS.CODMEDIDA, CONCAT('Q ' , CONVERT(money,PRECIOS.PRECIO )) as PRECIO FROM PRECIOS LEFT OUTER JOIN PRODUCTOS ON PRECIOS.CODPROD = PRODUCTOS.CODPROD AND PRECIOS.EMPNIT = PRODUCTOS.EMPNIT WHERE PRODUCTOS.EMPNIT='001'";
		
		    const request = new sql.Request()
		    request.stream = true // You can set streaming differently for each request
		    
			request.query(strSql) // or request.execute(procedure)
		                           
		    request.on('recordset', columns => {
		        // Emitted once for each recordset in a query
		    })
		 
		    request.on('row', row => {
		        // Emitted for each row in a recordset
				var stcodigo = "'" + row.CODPROD + "'";
				var stdescripcion = "'" + row.DESPROD + "'";
				fila = fila + '<tr><td>' + row.CODPROD + '</td><td>' + row.DESPROD + '</td><td>' + row.CODMEDIDA + '</td><td class="text-right">' + row.PRECIO +  '</td></tr>';
			})
		 
		    request.on('error', err => {
		        // May be emitted multiple times
			   
		    })
		 
		    request.on('done', result => {
		        
			// Always emitted as the last one
				sql.close()
				var result = fila;
				res.send(result);
				console.log('Datos cargados')			   
		    })
		})
		 
		sql.on('error', err => {
		    // ... error handler
				console.log('No se pudo cargar la Lista. Error: ' + err)
				//return 'Error al cargar'
		})
	});

app.use("/",router);

app.use("*",function(req,res){
  //res.sendFile(path + "app/404.html");
  res.send('No hay nada');
});

app.listen(PORT, function () {
  console.log('Servidor iniciado en el puerto ' + String(PORT));
})

