var http = require('http');
var path = require('path');
var rutas = [
    {route: '', output:'Funcionando'},
    {route: 'about', output:'Una simple pagina'},
    {route: 'otra pagina', output:function(){return 'Estamos en '+this.route;}},
];

http.createServer(function (req, res) {
    var buscar = path.basename(decodeURI(req.url));
    rutas.forEach(function(ruta){
        if (ruta.route === buscar)
        {
            res.writeHead(200, {'Content-Type':'text/html'});
            res.end(typeof ruta.output == 'function'?ruta.output():ruta.output);
        }
    });

    if(!res.finished)
    {
        res.writeHead(404);
        res.end('Pagina no encontrada');    
    }
    
    
}).listen(process.env.PORT || 8080)