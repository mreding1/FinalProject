var express = require('express');
var router = express.Router();

var mysql = require('mysql');

var con = mysql.createConnection({
  host: "ilab.engr.utk.edu",
  user: "mreding",
  password: "mreding@421"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    // res.send('MySQL::Connected!');
  });

/* Post review data. */
router.post('/review', function(req, res, next) {
  var sql = con.query("INSERT INTO mreding.review set ? ", req.body, function (err, result, fields) {
    if (err) {
      //throw err;
      res.sendStatus(400); // send an error 
    } else {      
      console.log(sql);
      // res.send(result);
      res.json({"status": "OK"}); // your own code
    }
  });
});

/*GET reviews. */
router.get('/review', function(req, res, next) {
  con.query("SELECT * FROM mreding.review order by date", function (err, result, fields) {
    if (err) {
      // throw err;
    }
    // console.log(result);
    res.send(result);
    //res.send('MySQL::Got Data!');
  });
});

/* GET facilities listing. */
/*router.get('/facility', function(req, res, next) {
  con.query("SELECT * FROM mreding.facility order by facility_zipcode", function (err, result, fields) {
    if (err) {
      // throw err;
    }
    // console.log(result);
    res.send(result);
    //res.send('MySQL::Got Data!');
  });
});*/

/* Post facility data. */
/*router.post('/facility', function(req, res, next) {
  var sql = con.query("INSERT INTO mreding.facility set ? ", req.body, function (err, result, fields) {
    if (err) {
      //throw err;
      res.sendStatus(400); // send an error 
    } else {      
      console.log(sql);
      // res.send(result);
      res.json({"status": "OK"}); // your own code
    }
  });
});*/

/* Search */
router.get('/facility', function(req, res, next) {  
  var zip = '%' + '%' + '%' + '%' + (req.body.facility_zipcode) + '%'; // add % 
  // console.log("stu: " + stu);
  var sql = con.query("SELECT * FROM mreding.facility WHERE facility_zipcode='?' ", function (err, result, fields) {
    if (err) {
      // throw err;
    }
    
    console.log(sql);
    res.send(result);
  });
});


/* GET patient listing. */
router.get('/patient', function(req, res, next) {
  con.query("SELECT * FROM mreding.patient", function (err, result, fields) {
    if (err) throw err;
    // console.log(result);
    res.send(result);
    //res.send('MySQL::Got Data!');
  });
});

/* Post new patient data. */
router.post('/patient', function(req, res, next) {
  var sql = con.query("INSERT INTO mreding.patient set ? ", req.body, function (err, result, fields) {
    if (err) throw err;
    
    console.log(sql);
    // res.send(result);
    res.json({"status": "OK"}); // your own
  });
});

/* GET appointment listing. */
/*router.get('/appointment', function(req, res, next) {
  con.query("SELECT * FROM mreding.appointment", function (err, result, fields) {
    if (err) throw err;
    // console.log(result);
    res.send(result);
    //res.send('MySQL::Got Data!');
  });
});

/* Post new appointment data. */
/*router.post('/appointment', function(req, res, next) {
  var sql = con.query("INSERT INTO mreding.appointment set ? ", req.body, function (err, result, fields) {
    if (err) throw err;
    
    console.log(sql);
    // res.send(result);
    res.json({"status": "OK"}); // your own
  });
});*/



module.exports = router;
