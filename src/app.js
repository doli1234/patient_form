
const express = require('express');
const app = express();
const router = express.Router();
const {Pool,Client} = require('pg');
const bodyParser = require('body-parser');


// const client = new Client({
//   user: 'postgres',
//   host: 'localhost',
//   database: 'usermaster',
//   password: 'admin',
 //  port: 5432,
// })

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'usermaster',
    password: 'admin',
    port: 5432,
});

pool.on('error', (err, client) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1)
});

//Third-party middelware
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: true
}));

router.post('/insert', function(req, response, next) {

    // Grab data from http request
    const data = {
        
        firstname: req.body.firstname, 
        lastname: req.body.lastname,
        mobileno: req.body.mobileno, 
        gender: req.body.gender,
        dob: req.body.dob, 
        bloodgrp: req.body.bloodgrp
    };

    const values = [
        
        data.firstname,
        data.lastname,
        data.mobileno,
        data.dob, 
        data.gender, 
        data.bloodgrp
    ];
    

    pool.connect((err, client, done) => {
        if (err)
            throw err;
        client.query('INSERT INTO patient(firstname, lastname, mobileno, dob, gender, bloodgrp) values($1, $2, $3, $4, $5, $6)', values, (err, res) => {
            done();
            if (err) {
                next(err);
                throw err
            }
            response.send('data is inserted');
            console.log('patient:', res.rows[0]);
            pool.end()
        })
    });
});
router.post('/fetchall', function(req, responce, next){

    

    pool.connect((err, client,done) => {
        if(err)
           throw err;
           client.query("select * from patient",(err, res)=>{
            
            done();
            if(err)
            {
                next(err);
                throw err
            }
            responce.send("fetch")
            console.log('patient:',res.rows);
            pool.end()
           
            
            });
        })
    });

    /*router.post('/update/id', function(req, responce, next){
        
        pool.connect((err, client,done) => {
            
            if(err)
               throw err;
               client.query('UPDATE patient SET firstname = $1 WHERE p_id = $2',(err, res)=>{
                done();
                if(err)
                {
                    next(err);
                    throw err
                }
                responce.send("update")
                console.log('patient:',res.rows);
                pool.end()
                
                });
            })
        });*/




app.use(router);
app.listen(5000, () => {
    console.log('SERVER STARTED ON PORT 5000');
});

