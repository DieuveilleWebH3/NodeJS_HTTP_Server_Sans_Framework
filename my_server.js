
const http = require("http");

const server = http.createServer( 
    (req, res) =>{

        if (req.method === "GET") 
        {
            // console.log("We received a connection");

            res.writeHead(200, {'content-type': 'text/html'});
            res.write("<h1> HELLO WORLD DIEUVEILLE </h1>");
        }
        else
        {
            res.writeHead(405, {'content-type': 'text/html'});
            res.write("<h1> Methode non authorisée </h1>");
        }
        
        res.end();
    }
);

server.listen(5000);
