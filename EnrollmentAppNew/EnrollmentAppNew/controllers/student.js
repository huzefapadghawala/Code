var db = require("../core/db");
var httpMsgs = require("../core/httpMessages");
var util = require("util");

exports.getAllStudents = function (req, resp) {
    db.executeSql("SELECT * FROM Student", function (data, err) {
        if (err) {
            httpMsgs.show500(req,resp,err);
        }
        else {
            httpMsgs.sendJson(req, resp, data);
        }
    });

};

exports.getStudentById = function (req, resp, studentId) {
    db.executeSql("SELECT * FROM Student WHERE StudentId = " + studentId, function (data, err) {
        if (err) {
            httpMsgs.show500(req, resp, err);
        }
        else {
            httpMsgs.sendJson(req, resp, data);
        }
    });
};

exports.addStudent = function (req, resp, reqBody) {
    try {
        if (!reqBody) throw new Error("Input not valid");
        var data = JSON.parse(reqBody);
        if (data) {
            var sql = "INSERT INTO Student(studentId, firstname, lastname, email, address, phone, ismasters, isphd, isdoingcapstone, isdoingthesis) VALUES ";
            sql += util.format("(%d, '%s', '%s', '%s', '%s', '%s', %d, %d, %d, %d)", data.StudentId, data.FirstName, data.LastName, data.Email, data.Address, data.Phone, data.IsMasters, data.IsPhd, data.IsDoingCapstone, data.IsDoingThesis);

            db.executeSql(sql, function (data, err) {
                if (err) {
                    httpMsgs.show500(req, resp, err);
                }
                else {
                    httpMsgs.send200(req, resp);
                }
            });

        }
        else {
            throw new Error("Input not valid");
        }
    
    }
    catch (ex) { 
        httpMsgs.show500(req, resp, ex);
    }


};

exports.updateStudent = function (req, resp, reqBody) {
    try {
        if (!reqBody) throw new Error("Input not valid");
        var data = JSON.parse(reqBody);
        if (data) {
            if (!data.StudentId) throw new Error("StudentId not provided");
            
            var sql = "UPDATE STUDENT SET ";
            var isDataProvided = false;
            if (data.FirstName) {
                sql += " FirstName = '" + data.FirstName + "',";
                isDataProvided = true;
            }
            
            if (data.LastName) {
                sql += " LastName = '" + data.LastName + "',";
                isDataProvided = true;
            }
            if (data.Email) {
                sql += " Email = '" + data.Email + "',";
                isDataProvided = true;
            }
            if (data.Address) {
                sql += " Address = '" + data.Address + "',";
                isDataProvided = true;
            }
            if (data.Phone) {
                sql += " Phone = '" + data.Phone + "',";
                isDataProvided = true;
            }
            
            if(data.IsMasters)
                sql += " IsMasters = " + 1 + ",";
            else
                sql += " IsMasters = " + 0 + ",";
            
            if (data.IsPhd)
                sql += " IsPhd = " + 1 + ",";
            else
                sql += " IsPhd = " + 0 + ",";
            
            if(data.IsDoingCapstone)
                sql += " IsDoingCapstone = " + 1 + ",";
            else
                sql += " IsDoingCapstone = " + 0 + ",";
            
            if(data.IsDoingThesis)
                sql += " IsDoingThesis = " + 1 + ",";
            else
                sql += " IsDoingThesis = " + 0 + ",";
            
            
            sql = sql.slice(0, -1); //remove last comma
            
            sql += " WHERE StudentId = " + data.StudentId;

            db.executeSql(sql, function (data, err) {
                if (err) {
                    httpMsgs.show500(req, resp, err);
                }
                else {
                    httpMsgs.send200(req, resp);
                }
            });

        }
        else {
            throw new Error("Input not valid");
        }
    
    }
    catch (ex) {
        httpMsgs.show500(req, resp, ex);
    }
};

exports.deleteStudent = function (req, resp, reqBody) {
    try {
        if (!reqBody) throw new Error("Input not valid");
        var data = JSON.parse(reqBody);
        if (data) {
            if (!data.StudentId) throw new Error("StudentId not provided");
            
            var sql = "DELETE FROM STUDENT  ";
            sql += " WHERE StudentId = " + data.StudentId;
            
            db.executeSql(sql, function (data, err) {
                if (err) {
                    httpMsgs.show500(req, resp, err);
                }
                else {
                    httpMsgs.send200(req, resp);
                }
            });

        }
        else {
            throw new Error("Input not valid");
        }
    
    }
    catch (ex) {
        httpMsgs.show500(req, resp, ex);
    }
};
