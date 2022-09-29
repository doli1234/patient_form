const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const db = require('./queries');

const { response } = require('express');

//const staticpath = path.join(__dirname,"/src");
//app.use(express.static(staticpath));

/*const fs = require('fs');

const folderPath = '/src/joe';

fs.readdirSync(folderPath);*/

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

/*app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})*/



const port = 5000

app.get('/users', db.getUsers)
app.get('/users/:id', db.getUserById)
/
app.post('/create', db.createUser)
app.put('/update/:id', db.updateUser)
app.delete('/delete/:id', db.deleteUser)


app.get('/address', db.getaddress)
app.get('/addbyid/:id', db.getAddressbyId)
app.post('/createadd', db.createaddress)
app.put('/updateadd/:id', db.updateaddress)
app.delete('/deleteadd/:id', db.deleteaddress)




app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})