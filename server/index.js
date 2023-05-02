const express = require("express");
const cors = require('cors');
const app = express();
app.use(cors());
const http = require('http');
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });
const PORT = 3000;
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
    email: String,
    image: String,


}
);






const Users = mongoose.model('Users', userSchema);

mongoose.connect('mongodb+srv://marv:root@cluster0.l1ulwbg.mongodb.net/titovideo', { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log("connected to database");
}
);

//requetes post
const bodyParser = require('body-parser');
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




