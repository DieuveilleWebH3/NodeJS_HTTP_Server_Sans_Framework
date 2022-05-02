
const http = require("http");

const server = http.createServer( 
    (req, res) =>{

        // console.log("We received a connection");

        console.log("HELLO WORLD DIEUVEILLE");
        
        res.end;
    }
);

server.listen(5000);
