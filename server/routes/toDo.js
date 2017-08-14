var express = require('express');
var router = express.Router();
var pool = require('../modules/pool'); 

router.post('/', function (req, res) {
    console.log('message post was hit!');
    // Add an INSERT query
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            // when connecting to database failed
            console.log('Error connecting to database', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            // when connecting to database worked!
            client.query('INSERT INTO toDo (task,comp,del) VALUES ($1, $2, $3);', [req.body.task, req.body.comp, req.body.del], function (errorMakingQuery, result) {
                done();
                if (errorMakingQuery) {
                    console.log('Error making database query', errorMakingQuery);
                    res.sendStatus(500);
                } else {
                    res.sendStatus(201);
                }
            });
        }
    });
});

//chomped
// 
router.put('/:id', function (req, res) { //:id
    var messageId = req.params.id; // messageId is 7
    var newMessage = req.params.task
    console.log('message put was hit!');
    // Add an INSERT query
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            // when connecting to database failed
            console.log('Error connecting to database', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            // when connecting to database worked!
            // cant figure what value to put for id, cant figure out where the $values came from...are they automatically defined?
            client.query('UPDATE toDo SET comp = "comp" WHERE id=$1;', [req.params.id], function (errorMakingQuery, result) {
                done();
                if (errorMakingQuery) {
                    console.log('Error making database query', errorMakingQuery);
                    res.sendStatus(500);
                } else {
                    res.sendStatus(200);
                }
            });
        }
    });
});

//delete
router.delete('/:id', function (req, res) {
    var messageId = req.params.id; // messageId is 7
    console.log('message delete was hit!');
    // Add an INSERT query
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            // when connecting to database failed
            console.log('Error connecting to database', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            // when connecting to database worked!
            //couldnt get the deletes to match uup
            client.query('DELETE FROM toDo WHERE id=$1;', [messageId], function (errorMakingQuery, result) {
                done();
                if (errorMakingQuery) {
                    console.log('Error making database query', errorMakingQuery);
                    res.sendStatus(500);
                } else {
                    res.sendStatus(200);
                }
            });
        }
    });
});
//get
router.get('/', function (req, res) {
    console.log('message get was hit!');
    // Add a SELECT query
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            // when connecting to database failed
            console.log('Error connecting to database', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            // when connecting to database worked!
            client.query('SELECT * FROM toDo;', function (errorMakingQuery, result) {
                done();
                if (errorMakingQuery) {
                    console.log('Error making database query', errorMakingQuery);
                    res.sendStatus(500);
                } else {
                    res.send(result.rows);
                }
            });
        }
    });
});

module.exports = router;