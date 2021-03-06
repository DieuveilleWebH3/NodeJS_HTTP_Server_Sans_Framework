
/* We  import / declare / call  all the Node JS modules we need */

// http
const http = require("http"); 

// file system module
const fs = require('fs');
 
// path module
const path = require('path');

// 
// const util = require("util");
// // import { isNullOrUndefined } from "util";       // this has been deprecated 
// // const { isNullOrUndefined } = require("util");   // this has been deprecated 
// import { isNullOrUndefined } from 'is-what';    // cannot use import outside module 
// const { isNullOrUndefined } = require("is-what");   // cannot use import outside module 


// We create our database 
const memoryDb = new Map();

// We create the initial id
let id = 0; 

memoryDb.set(id++, {nom: "Alice"}); 
memoryDb.set(id++, {nom: "Bob"});
memoryDb.set(id++, {nom: "Charlie"});
memoryDb.set(id++, {nom: "Dieuveille"});
memoryDb.set(id++, {nom: "BOUSSA ELLENGA"});

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

            // checking that the request has been made with the method GET 
            if (req.method === "GET") 
            {
                if (req.url === '/')
                {
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
                    // header
                    res.writeHead(200, { 'content-type': 'application/json' }); 

                    // paylod / body 
                    res.write(JSON.stringify(mapToObj(memoryDb)));
                }

                else if (req.url.match(/\/api\/name\/\d+$/))
                {
                    // we retrieve the id 
                    let the_id = parseInt((req.url.split('/'))[req.url.split('/').length - 1]);


                    // if the id does not exist in the object  ===  204 No Content
                    if (the_id >= memoryDb.size) 
                    {
                        // header
                        // res.writeHead(204, { 'content-type': 'text/html' }); 
                        res.writeHead(200, { 'content-type': 'text/html' }); 

                        // throw '204 No Content'
                        // 204 No Content
                        res.write("<h1> 204 No Content </h1>");
                    }
                    else
                    {
                        // header
                        res.writeHead(200, { 'content-type': 'application/json' });

                        // paylod / body 
                        res.write(JSON.stringify(mapToObj(memoryDb)[the_id]));
                        // res.write(JSON.stringify(mapToObj(memoryDb)[2]));
                    }
                }

                else
                {
                    // We return the 404 status code when they request a route / url that does not exist 

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
                    res.write(error404Html);
                    
                }

            }

            // checking that the request has been made with the method POST 
            else if (req.method === "POST") 
            {
                if (req.url === '/api/names') 
                {
                    let data = '';

                    req.on('data', chunk => {
                        data += chunk;
                    });

                    req.on('end', () => {
                        // if (isNullOrUndefined(data)) 
                        if (typeof(data) === undefined || typeof(data) === null) 
                        {
                            // header
                            res.writeHead(400, { 'content-type': 'text/html' });

                            // throw 'bad request'
                            // 400 Bad Request
                            res.write("<h1> 400 Bad Request </h1>");
                        } 

                        else 
                        {
                            data = JSON.parse(data);

                            console.log(typeof(data), "\n", data);

                            if (!('name' in data)) 
                            {
                                // header
                                res.writeHead(400, { 'content-type': 'text/html' });
                                // res.writeHead(200, { 'content-type': 'text/html' });

                                // 400 Bad Request
                                console.log("<h1> 400 Bad Request </h1>");
                                res.write("<h1> 400 Bad Request </h1>");
                            }
                            else
                            {
                                let the_current_id = id;

                                memoryDb.set(id++, data);

                                // header
                                res.writeHead(201, { 'content-type': 'application/json' });

                                // paylod / body 
                                console.log("<h1> 201 Element Created</h1>");

                                console.log(memoryDb);

                                res.write(JSON.stringify(memoryDb.get(the_current_id)));
                            }
                        }
                    });
                }
                else
                {
                    // We return the 404 status code when they request a route / url that does not exist 

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
                    res.write(error404Html);
                    
                }
            }           

            // checking that the request has been made with the method POST 
            else if (req.method === "PUT") 
            {
                if (req.url.match(/\/api\/name\/\d+$/))
                {
                    // we retrieve the id 
                    let the_id = parseInt((req.url.split('/'))[req.url.split('/').length - 1]);

                    // if id not in the object   ===  204 No Content
                    if (the_id >= memoryDb.size + 1) 
                    {
                        // header
                        res.writeHead(400, { 'content-type': 'text/html' });

                        // 400 Bad Request
                        res.write("<h1> 400 Bad Request : ID too large </h1>");
                    }
                    else
                    {
                        let data = '';

                        req.on('data', chunk => {
                            data += chunk;
                        });

                        req.on('end', () => {
                            // if (isNullOrUndefined(data)) 
                            if (typeof(data) === undefined || typeof(data) === null) 
                            {
                                // header
                                res.writeHead(400, { 'content-type': 'text/html' });

                                // 400 Bad Request
                                res.write("<h1> 400 Bad Request </h1>");
                            }

                            else 
                            {
                                data = JSON.parse(data);
    
                                console.log(typeof(data), "\n", data);
    
                                if (!('name' in data)) 
                                {
                                    // header
                                    // res.writeHead(400, { 'content-type': 'text/html' });
                                    res.writeHead(200, { 'content-type': 'text/html' });
    
                                    // throw 'bad request'
                                    // 400 Bad Request
                                    console.log("<h1> 400 Bad Request </h1>");
                                    res.write("<h1> 400 Bad Request </h1>");
                                }
                                else
                                {
                                    // header
                                    res.writeHead(204, { 'content-type': 'application/json' }); 

                                    memoryDb.set(the_id, data)
                                }
                            }
                        });
                    }
                }
                
                else
                {
                    // We return the 404 status code when they request a route / url that does not exist 

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
                    res.write(error404Html);
                    
                }

            }           

            // checking that the request has been made with the method POST 
            else if (req.method === "DELETE") 
            {
                if (req.url.match(/\/api\/name\/\d+$/))
                {
                    // we retrieve the id 
                    let the_id = parseInt((req.url.split('/'))[req.url.split('/').length - 1]);

                    // if id not in object  ===  204 No Content
                    if (the_id >= memoryDb.size) 
                    {
                        // header
                        res.writeHead(400, { 'content-type': 'text/html' });

                        // 400 Bad Request
                        res.write("<h1> 400 Bad Request : ID too large </h1>");
                    }
                    else
                    {
                        // header
                        res.writeHead(204, { 'content-type': 'text/html' });

                        memoryDb.delete(the_id)
                    }
                }
                else
                {
                    // We return the 404 status code when they request a route / url that does not exist 

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
                    res.write(error404Html);
                    
                }

            }

            // if the request has not been made with the method GET nor POST
            else
            {
                // We return the 405 status code for / with the method not allowed message 

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
                res.write(error405Html);
            }

        }
        catch (err) 
        {
            // We return the 500 status code erro if there is a server error / syntax error / execution error 

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
            res.write(error500Html);
        } 
        
        res.end();
    }

);

// We listen / serve / deploy  on port 5000
server.listen(5000);
