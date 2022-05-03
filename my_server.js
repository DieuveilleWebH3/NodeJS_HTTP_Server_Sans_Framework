
// we declare/call the node js http module & file system module & path module 
const http = require("http"), 
    fs = require('fs'),
    path = require('path');


const memoryDb = new Map(); // est global
let id = 0; // doit être global
memoryDb.set(id++, {nom: "Alice"}); 
memoryDb.set(id++, {nom: "Bob"});
memoryDb.set(id++, {nom: "Charlie"});

const mapToObj = m => {
    return Array.from(m).reduce((obj, [key, value]) => {
        obj[key] = value;
        return obj;
    }, {});
};


// we create our server instance from the http module
const server = http.createServer( 
    (req, res) =>{

        try {

            // console.log(req.httpVersion, req.url, req.method);


            console.log(" Map memory DB");
            console.log(memoryDb);
            console.log("JSON memory DB");
            console.log(JSON.stringify(memoryDb));


            // checking that the request has been made with the method GET 
            if (req.method === "GET") 
            {
                if (req.url === '/')
                {
                    // const indexHtml = fs.readFileSync('./public/pages/index.html', function (err, html) {
                    const indexHtml = fs.readFileSync(path.join(__dirname, "/public/pages/index.html"), function (err, html) {
                        if (err) 
                        {
                            throw err; 
                        } 

                        return html;
                    });

                    // We return the right status code with the correct message  

                    // header
                    res.writeHead(200, {'content-type': 'text/html'});

                    // paylod / body
                    // res.write("<h1> HELLO WORLD DIEUVEILLE </h1>");
                    res.write(indexHtml);
                }

                else if (req.url === '/public/image.png' || req.url === '/public/png/image.png') 
                {
                    // We return the image route when requested  

                    const my_image = fs.readFileSync(path.join(__dirname, '/public/png/image.png'), function (err, img) {
                        if (err) 
                        {
                            throw err; 
                        } 
    
                        return img;
                    });

                    // header
                    res.writeHead(200, { 'content-type': 'image/png' }); 

                    // paylod / body
                    res.write(my_image);
                }

                else if (req.url === '/public/css/style.css') 
                {
                    // We return the style.css route when requested  

                    const my_style = fs.readFileSync(path.join(__dirname, req.url), function (err, css) {
                        if (err) 
                        {
                            throw err; 
                        } 
    
                        return css;
                    });

                    // header
                    res.writeHead(200, { 'content-type': 'text/css' }); 

                    // paylod / body
                    res.write(my_style);
                }

                else if (req.url === '/public/js/script.js') 
                {
                    // We return the script.js route when requested  

                    const my_script = fs.readFileSync(path.join(__dirname, req.url), function (err, js) {
                        if (err) 
                        {
                            throw err; 
                        } 
    
                        return js;
                    });

                    // header
                    res.writeHead(200, { 'content-type': 'text/javascript' }); 

                    // paylod / body
                    res.write(my_script);
                }

                else if (req.url === '/api/names') 
                {

                    console.log(" Map memory DB  in  IF");
                    console.log(memoryDb);
                    console.log("JSON memory DBB  in  IF");
                    console.log(JSON.stringify(memoryDb));


                    // let data = '';

                    // req.on('data', chunk => {

                    //     console.log("\n"); 

                    //     data += chunk;

                    //     console.log("Chunk Data", data); 

                    // });

                    // req.on('end', () => {

                    //     console.log("\n"); 
                
                    //     // console.log(JSON.parse(data).todo); // 'Buy the milk'
                
                    //     // console.log("End Data", data); 
                    //     console.log("End Data", JSON.parse(data)); // 'Buy the milk'
                
                    //     let results = {
                    //         name : "Hello",
                    //         age : 21
                    //     };
                
                    //     results = JSON.stringify(results);
                
                    //     res.write(results);
                
                    //     res.end();
                    // });



                    let testing = new Map(); 
                    let j = 0; 
                    testing.set(j++, {nom: "Alice"});
                    testing.set(j++, {nom: "Bob"});
                    testing.set(j++, {nom: "Charlie"});

                    // header
                    // res.writeHead(200, { 'content-type': 'application/json' }); 
                    res.writeHead(200, { 'content-type': 'text/javascript' }); 

                    // paylod / body
                    // res.write(testing);
                    // res.write(123);

                    const responseData = {
                        message: "Hello, GFG Learner",
                        articleData: 
                        {
                            articleName: "How to send JSON response from NodeJS",
                            category: "NodeJS",
                            status: "published"
                        },
                        endingMessage: "Visit Geeksforgeeks.org for more"
                    }
                    
                    // const jsonContent = JSON.stringify(memoryDb);
                    const jsonContent = JSON.stringify(testing);
                    // const jsonContent = JSON.stringify(responseData);
                    
                    // res.end(jsonContent);
                    // res.end(testing);
                    // res.end(memoryDb);

                    res.write(JSON.stringify(mapToObj(memoryDb)));

                    
                }

                else
                {
                    // We return the 404 status code when they request a route / url that does not exist 

                    // const error404Html = fs.readFileSync('./public/pages/error404.html', function (err, html) {
                    const error404Html = fs.readFileSync(path.join(__dirname, "/public/pages/error404.html"), function (err, html) {
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

            }

            // if the request has not been made with the method GET 
            else
            {
                // We return the 405 status code for / with the method not allowed message 

                // const error405Html = fs.readFileSync('./public/pages/error405.html', function (err, html) {
                const error405Html = fs.readFileSync(path.join(__dirname, "/public/pages/error405.html"), function (err, html) {
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

            // const error500Html = fs.readFileSync('./public/pages/error500.html', function (err, html) {
            const error500Html = fs.readFileSync(path.join(__dirname, "/public/pages/error500.html"), function (err, html) {
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

// We listen / serve / deploy  on port 5000
server.listen(5000);



/*


if (req.method === "POST") {
    let data = ''
    req.on('data', chunk => {
        data += chunk;
    })
    req.on('end', () => {
        try {
            if (typeof data === undefined) {
                throw 'bad request'
            } else {
                data = JSON.parse(data)
                if (!('name' in data)) {
                    throw 'bad request - test'
                }
                let currentId = id
                memoryDb.set(id++, data)
                res.writeHead(201, { 'content-type': 'application/json' });
                res.write(JSON.stringify(memoryDb.get(currentId)));
                res.end();
            }
        } catch (err) {
            console.log(err)
            res.writeHead(400, { 'content-type': 'text/html' });
            res.write(fs.readFileSync(path.join(__dirname, "public", "pages", "bad_request.html")));
            res.end()
        }
    });

*/