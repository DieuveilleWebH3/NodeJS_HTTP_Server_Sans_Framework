
// we declare/call the node js http module & file system module
const http = require("http"), 
    fs = require('fs');


// we create our server instance from the http module
const server = http.createServer( 
    (req, res) =>{

        try {
            
            // console.log(req.httpVersion, req.url, req.method);

            if (req.url !== '/')
            {
                // We return the 404 status code when they request a route / url that does not exist 

                const error404Html = fs.readFileSync('./public/pages/error404.html', function (err, html) {
                    if (err) 
                    {
                        throw err; 
                    } 
    
                    return html;
                });

                // header
                res.writeHead(404, {'content-type': 'text/html'});

                // payload / body 
                // res.write("<h1> 404 Page introuvable </h1>");
                res.write(error404Html);
                
            }

            // checking that the request has been made with the method GET 
            else if (req.method === "GET") 
            {
                // console.log("\n");

                const indexHtml = fs.readFileSync('./public/pages/index.html', function (err, html) {
                    if (err) 
                    {
                        throw err; 
                    } 

                    return html;
                });

                // console.log(indexHtml);

                // console.log("\n");

                // We return the right status code with the correct message  

                // header
                res.writeHead(200, {'content-type': 'text/html'});

                // paylod / body
                // res.write("<h1> HELLO WORLD DIEUVEILLE </h1>");
                res.write(indexHtml);
            }

            // if the request has not been made with the method GET 
            else
            {
                // We return the 405 status code for / with the method not allowed message 

                const error405Html = fs.readFileSync('./public/pages/error405.html', function (err, html) {
                    if (err) 
                    {
                        throw err; 
                    } 
    
                    return html;
                });

                // header
                res.writeHead(405, {'content-type': 'text/html'});

                // payload / body 
                // res.write("<h1> 405 Methode non authorisée </h1>");
                res.write(error405Html);
            }
        }
        catch (err) 
        {
            // We return the 500 status code erro if there is a server error / syntax error / execution error 

            const error500Html = fs.readFileSync('./public/pages/error500.html', function (err, html) {
                if (err) 
                {
                    throw err; 
                } 

                return html;
            });

            // header
            res.writeHead(500, {'content-type':'text/html'});

            // payload / body 
            // res.write('<h1>500 Erreur Interne au Serveur</h1>');
            res.write(error500Html);
        }            
        
        res.end();
    }
);

// we listen / deploy on port 5000
server.listen(5000);
