const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0; 

// DB='d81fb98csb0li1'
// DB_USERNAME='jxkiayzrrypxkj'
// DB_PASSWORD='936bcf48a26fec29c65db7d40e7d8122d9027a62a2732b9dfcb5fb7514eda734'
// HOST='ec2-54-159-107-189.compute-1.amazonaws.com'

const db = knex({
    client: 'pg',
    connection: {
        // connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
          },
          host: 'ec2-54-159-107-189.compute-1.amazonaws.com',
          database: 'd81fb98csb0li1',
          user: 'jxkiayzrrypxkj',
        password: '936bcf48a26fec29c65db7d40e7d8122d9027a62a2732b9dfcb5fb7514eda734',
            
    },
    debug: true
});

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('it is working!');
});

app.post('/signin', (req, res) => {signin.handleSignin(req, res, db, bcrypt)});

app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)});

app.get('/profile/:id', (req, res) => {profile.handleProfileGet(req, res, db)});

app.put('/image', (req, res) => {image.handleImage(req, res, db)});
app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)});

app.listen(process.env.PORT || 3001, () => {
    console.log(`app is running on port ${process.env.PORT}`);
});


/*
API Plan

/ --> res = this is working

/signin --> POST = success/fail
/register --> POST = user
/profile/:userId  --> GET = user
/image --> PUT --> user

*/