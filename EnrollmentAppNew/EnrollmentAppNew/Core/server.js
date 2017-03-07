var http = require("http");
var student = require("../controllers/student");
var settings = require("../settings");
var httpMsgs = require('./httpMessages');


http.createServer(function (req, resp) {
    switch (req.method) {
        case "GET":
            if (req.url === "/") {
                resp.end();
            }
            else if (req.url === "/students") {
                student.getAllStudents(req, resp);
            }
            else {
                var studentPattn = "[0-9]+";
                var pattn = new RegExp("/students/" + studentPattn);
                if (pattn.test(req.url)) {
                    var newPattn = new RegExp(studentPattn);    //using pattern 0-9 get the student id 
                    var studentId = newPattn.exec(req.url);
                    student.getStudentById(req, resp, studentId);
                }
                else { 
                    httpMsgs.show404(req, resp);
                }
            }

            break;
        case "POST"://save
            if (req.url === "/students") {
                var reqBody = '';
                req.on("data", function (data) {
                    reqBody += data;
                    //check limit here

                });
                req.on("end", function () { 
                    student.addStudent(req, resp, reqBody);
                
                });
            }
            else { 
                httpMsgs.show404(req, resp);
            }
            break;
        case "PUT"://update
            if (req.url === "/students") {
                var reqBody = '';
                req.on("data", function (data) {
                    reqBody += data;
                    //check limit here

                });
                req.on("end", function () {
                    student.updateStudent(req, resp, reqBody);
                
                });
            }
            else {
                httpMsgs.show404(req, resp);
            }
            break;
        case "DELETE":
            if (req.url === "/students") {
                var reqBody = '';
                req.on("data", function (data) {
                    reqBody += data;
                    //check limit here

                });
                req.on("end", function () {
                    student.deleteStudent(req, resp, reqBody);
                
                });
            }
            else {
                httpMsgs.show404(req, resp);
            }
            break;
        default:
            httpMsgs.show405(req, resp);
            break;

    }


}).listen(9000, function () { 
    console.log("started listening at port: " + settings.webPort);

});