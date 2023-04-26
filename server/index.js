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
const {Sequelize} = require("sequelize");
const fs = require("fs");


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const sequelize = new Sequelize('mydatabase', 'myusername', 'mypassword', {
    host: 'localhost',
    dialect: 'mysql'
});

const File = sequelize.define('File', {
    name: Sequelize.STRING,
    data: Sequelize.BLOB('long')
});

//envoie de fichier
app.post('/upload', upload.single('file'), (req, res) => {
    const file = req.file;
    File.create({
        name: file.originalname,
        data: fs.readFileSync(file.path)
    }).then(() => {
        res.send('Fichier téléchargé avec succès');
    }).catch(error => {
        console.error(error);
        res.status(500).send('Erreur lors du téléchargement du fichier');
    });
});

