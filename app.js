var express = require('express');
var app = express();

var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');
var url = 'mongodb://localhost:27017/mikrotik';

app.set('port',(process.env.PORT || 3000));
app.use(express.static(__dirname + '/public'));

app.set('views',__dirname+'/views');
app.set('view engine','jade');

var findDocuments = function(db, callback) {
  // Get the documents collection
  var collection = db.collection('status');
  // Find some documents
  collection.find().toArray(function(err, docs) {
    assert.equal(err, null);
    assert.equal(2, docs.length);
    console.log("Found the following records");
    console.dir(docs);
    callback(docs);
  });
}



app.get('/',function (req , res) {

	MongoClient.connect(url, function(err, db) {
		console.log("Connected correctly to server");

		findDocuments(db, function(result) {
			console.log(result);
			res.render('index',{'data':result});
			db.close();
		});
	});
	
});

app.listen(app.get('port'),function () {
	console.log('app start at port : '+app.get('port'));
});