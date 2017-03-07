var settings = require("../settings");

exports.show500 = function (req, resp, err) {
    if (settings.httpMessagesFormat === "HTML") { 
        resp.writeHead(500, "Internal Error Occurred", { "Content-Type": "text/html" });
        resp.write("<html><head><title>500</title></head><body>500: Internal Error Occurred. Details: " + err + "</body></html>");    
    }
    else {
                resp.writeHead(500, "Internal Error Occurred", { "Content-Type" : "application/json" });
            resp.write(JSON.stringify({ data: "ERROR occurred:" + err }));
    }
    resp.end();
};

exports.show405 = function (req, resp) {
    if (settings.httpMessagesFormat === "HTML") {
        resp.writeHead(405, "Method not supported", { "Content-Type": "text/html" });
        resp.write("<html><head><title>405</title></head><body>405: Method not supported</body></html>");
    }
    else {
        resp.writeHead(500, "Method not supported", { "Content-Type" : "application/json" });
        resp.write(JSON.stringify({ data: "Method not supported" }));
    }
    resp.end();
};

exports.show404 = function (req, resp) {
    if (settings.httpMessagesFormat === "HTML") {
        resp.writeHead(404, "Resource not found", { "Content-Type": "text/html" });
        resp.write("<html><head><title>404</title></head><body>404: Resourse not found</body></html>");
    }
    else {
        resp.writeHead(404, "Resourse not found", { "Content-Type" : "application/json" });
        resp.write(JSON.stringify({ data: "Resourse not found" }));
    }
    resp.end();
};

exports.send200 = function (req, resp) {
    resp.writeHead(200, { "Content-Type": "application/json" });
    resp.end();
};

exports.sendJson = function (req, resp, data) {
    resp.writeHead(200, { "Content-Type" : "application/json" });
    if (data) {
        resp.write(JSON.stringify(data));
    }
    resp.end();
}