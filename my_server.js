
const http = require("http");

const server = http.createServer( 
    (req, res) =>{

        // console.log("We received a connection");

        // console.log("HELLO WORLD DIEUVEILLE");
        
        console.log(req);
        console.log(res);

        res.writeHead(200, {'content-type': 'text/html'});
        res.write("<h1> HELLO WORLD DIEUVEILLE </h1>");
        
        res.end;
    }
);

server.listen(5000);
