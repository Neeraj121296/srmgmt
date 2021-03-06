const fs = require('fs');
const fileDir = 'C:/Bhuwan/Learning/ServiceRecordMgmt/uploads/';
const path = require('path');


module.exports = function(app) {
	
	// fetch employee detail based on employee id
	app.get('/api/servicerecords/view/:empId', function(req, res) {
		let empId =  req.params.empId;
		var filePath = path.join(fileDir, empId, empId+'_SR.pdf');
		console.log(filePath);
		fs.createReadStream(filePath).pipe(res);
	});

	app.get('/api/servicerecords/download/:empId', function(req, res) {
		let empId =  req.params.empId;
		var filePath = path.join(fileDir, empId, empId+'_SR.pdf');
		console.log(filePath);
		fs.createReadStream(filePath).pipe(res);
	});

	app.get('/api/servicerecords/history/:empId', function(req, res) {
		let empId =  req.params.empId;
		let query = "SELECT e.employeeId, e.employeeName, r.recordType, r.createTimestamp, r.tokenNumber, r.comment "
		+ " FROM `employee` e ,`recordhistory` r"
		+ " WHERE e.employeeId = r.employeeId AND e.employeeId = ?"
		+ " ORDER BY r.createTimestamp";
		db.query(query, [empId] ,function (err, result) { 
			if(err) {
				console.log("error: ", err);
				res.status(500).send(err);
			}else{									
				res.status(200).send(result);
			}
			res.end();
		});    
	});

}