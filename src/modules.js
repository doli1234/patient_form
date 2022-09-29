const express = require('express')
const { appendFile } = require('fs')
const module = require('module')

appendFile.use(express)

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
