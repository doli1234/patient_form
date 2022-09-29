

const express = require('express')
const app = express();
const PORT = process.env.PORT || 5000;

const { application } = require('express');
const { Client } = require('pg')
const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'usermaster',
  password: 'admin',
  port: 5432,
})
client.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});


/*client.query("insert into patient(firstname,lastname,mobileno,gender,dob,bloodgrp) values(%s, %s, %s, %s, %s, %s)",(err, res)=>{
client.query("select * from patient",(err, res)=>{
if(!err)
{
    console.log(res.rows);
}
else
{
    console.log("error occured: " +err.message)
}
client.end()
});*/

const text = 'select * from patient'
//const values = ['brianc', 'brian.m.carlson@gmail.com']
// callback
client.query(text, (err, res) => {
  if (err) {
    console.log(err.stack)
  } else {
    console.log(res.rows[0])
    // { name: 'brianc', email: 'brian.m.carlson@gmail.com' }
  }
})

app.listen(PORT, () =>               //callback function =>
{
  console.log(`listening on port ${PORT}`);
});