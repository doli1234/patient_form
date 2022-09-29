const { request, response } = require('express');
const { date } = require('joi');
//const db = require('../src/db')
const joi = require("joi");


const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'usermaster',
  password: 'admin',
  port: 5432,
})
const getUsers = (request, response) => {
  //pool.query('select* from patient',
  pool.query('SELECT patient.id, patient.firstname, patient.lastname, patient.mobileno, patient.gender, patient.dob, patient.bloodgrp, address.address_line1 ,address.address_line2, address.area, address.city, address.state, address.zipcode, address.adharno FROM patient FULL JOIN address ON patient.id = address.add_id',
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
}

// fetch alladdress with address id
const getaddress = (request, response) => {
  pool.query('SELECT * FROM address', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}
const getUserById = (request, response) => {
  const id = parseInt(request.params.id)
  pool.query('SELECT * FROM patient  WHERE id = $1', [id], (error, results) => {
    //pool.query('SELECT patient.id, patient.firstname, patient.lastname, patient.mobileno, patient.gender, patient.dob, patient.bloodgrp, address.address_line1 ,address.address_line2, address.area, address.city, address.state, address.zipcode, address.adharno FROM patient FULL JOIN address ON patient.id = address.add_id',
    //(error, results) => {

    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

//fetch  address with address id
const getAddressbyId = (request, response) => {
  const add_id = parseInt(request.params.id)
  pool.query('SELECT * FROM address WHERE add_id = $1', [add_id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}


const patientschema = joi.object({
  firstname: joi.string().required(),
  lastname: joi.string().required(),
  mobileno: joi.string().length(10),
  gender: joi.string().required(),
  dob: joi.date().required(),
  bloodgrp: joi.string(),
});

const createUser = (request, response) => {
  const { firstname, lastname, mobileno, dob, gender, bloodgrp } = request.body
  const { error, value } = patientschema.validate(request.body);
  if (error) {
    console.log(error);
    return response.send(error.details);
  }
  else {
    response.send("successfully created");
  }


  pool.query('INSERT INTO patient(firstname, lastname, mobileno, dob, gender, bloodgrp) values($1, $2, $3, $4, $5, $6)', [firstname, lastname, mobileno, dob, gender, bloodgrp], (err, results) => {
    if (err) {
      throw err
    }
    response.status(201).send(`User added with ID: ${results.insertId}`)
  })
}

//create address 
const addressschema = joi.object({
  address_line1: joi.string().required(),
  address_line2: joi.string().required(),
  area: joi.string().required(),
  city: joi.string().required(),
  state: joi.string().required(),
  zipcode: joi.string().required(),
  adharno: joi.string().length(11),
});

const createaddress = (request, response) => {
  const { address_line1, address_line2, area, city, state, zipcode, adharno } = request.body
  const { error, value } = addressschema.validate(request.body);
  if (error) {
    console.log(error);
    return response.send(error.details);
  }
  else {
    response.send("successfully created");
  }
  pool.query('INSERT INTO address(address_line1, address_line2, area, city, state, zipcode,adharno) values($1, $2, $3, $4, $5, $6, $7)', [address_line1, address_line2, area, city, state, zipcode, adharno], (err, results) => {
    if (err) {
      throw err
    }
    response.status(201).send(`User added with ID: ${results.insertid}`)
  })
}

const updateUser = (request, response) => {
  const id = parseInt(request.params.id)
  const { firstname, gender } = request.body
  pool.query(
    'UPDATE patient SET firstname = $1, gender= $2 WHERE id = $3',
    [firstname, gender, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User modified with ID: ${id}`)
    })
}

//update address with address_id
const updateaddress = (request, response) => {
  const add_id = parseInt(request.params.id)
  const { address_line1, city } = request.body
  pool.query(
    'UPDATE address SET address_line1 = $1, city= $2 WHERE add_id = $3',
    [address_line1, city, add_id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User modified with address_iD: ${add_id}`)
    })
}


const deleteUser = (request, response) => {
  const id = parseInt(request.params.id)
  pool.query('DELETE FROM patient WHERE id = $1', [id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User deleted with ID: ${id}`)
    })
}

//delete address

const deleteaddress = (request, response) => {
  const add_id = parseInt(request.params.id)
  pool.query('DELETE FROM address WHERE add_id = $1', [add_id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User deleted with ID: ${add_id}`)
    })
}




module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,

  getaddress,
  getAddressbyId,
  createaddress,
  updateaddress,
  deleteaddress,
}
