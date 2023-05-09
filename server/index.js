const express = require("express");
const cors = require('cors');
const app = express();
app.use(cors());
const http = require('http');
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });
const PORT = 3001;
const server = http.createServer(app);





server.listen(PORT, () => {
    console.log(`listening on *:${PORT}`);
});


//database
const mongoose = require('mongoose');
const { Schema } = mongoose;


const userSchema = new Schema({
    username: String,
    password: String,
    email: String



}
);



/*
const Users2 = mongoose.model('Users2', userSchema);

mongoose.connect('mongodb://localhost:27017/titovideo/Users2', { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log("connected to database");
}
);
*/

//login

/*
app.get('/signin2')
const { username, password } = req.query;

Users2.findOne({ username: username, password: password })
    .then((user2) => {
        if (user2) {
            res.json(user2);

        } else {
            res.json(false);
        }
    })
    .catch((err) => {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while searching for the user.' });
    });
*/



const Users = mongoose.model('Users', userSchema);

mongoose.connect('mongodb+srv://marv:root@cluster0.l1ulwbg.mongodb.net/titovideo', { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log("connected to database");
}
);



//requetes post
const bodyParser = require('body-parser');
const req = require("express/lib/request");
const res = require("express/lib/response");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



//inscription
app.post('/signup', (req, res) => {
    console.log(req.body);
    const users = new Users({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,


    })
    //save to database
    users.save().then(data => {
        res.json(data);
    });
});

//login

app.get('/signin', (req, res) => {

        const { username, password } = req.query;

        Users.findOne({ username: username, password: password })
            .then((user) => {
                if (user) {
                    res.json(user);

                } else {
                    res.json(false);
                }
            })
            .catch((err) => {
                console.error(err);
                res.status(500).json({ error: 'An error occurred while searching for the user.' });
            });

    }
);



