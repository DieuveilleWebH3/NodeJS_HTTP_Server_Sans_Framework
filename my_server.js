
// we declare/call the node js http module 
const http = require("http");

// we create our server instance from the http module
const server = http.createServer( 
    (req, res) =>{

        // checking that the request has been made with the method GET 
        if (req.method === "GET") 
        {
            // We return the right status code with the correct message  

            // header
            res.writeHead(200, {'content-type': 'text/html'});

            // paylod / body
            res.write("<h1> HELLO WORLD DIEUVEILLE </h1>");
        }

        // if the request has not been made with the method GET 
        else
        {
            // We return the 405 status code for / with the method not allowed message 

            // header
            res.writeHead(405, {'content-type': 'text/html'});

            // payload / body 
            res.write("<h1> Methode non authorisée </h1>");
        }
        
        res.end();
    }
);

server.listen(5000);
