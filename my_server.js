
// we declare/call the node js http module 
const http = require("http");

// we create our server instance from the http module
const server = http.createServer( 
    (req, res) =>{

        try {
            // 
            console.log(req.httpVersion, req.url, req.method);

            if (req.url !== '/')
            {
                // We return the 404 status code when they request a route / url that does not exist 

                // header
                res.writeHead(404, {'content-type': 'text/html'});

                // payload / body 
                res.write("<h1> 404 Page introuvable </h1>");
            }

            // checking that the request has been made with the method GET 
            else if (req.method === "GET") 
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
                res.write("<h1> 405 Methode non authorisée </h1>");
            }
        }
        catch (err) 
        {
            // We return the 500 status code erro if there is a server error / syntax error / execution error 

            // header
            res.writeHead(500, {'content-type':'text/html'});

            // payload / body 
            res.write('<h1>500 Internal Server Error</h1>');
        }
            
        
        res.end();
    }
);

server.listen(5000);
