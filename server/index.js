const express = require("express");
const cors = require('cors');
const app = express();
app.use(cors());
const http = require('http');
const multer  = require('multer');
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
    commande: Array,
    points: Number



}
);

//nouveaux utilisateurs

const usershema2 = new Schema({
    username: String,
    password: String,
    email: String

}
);
const Users2 = mongoose.model('Users2', usershema2);











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



//afficher toutes les commandes de tous les utilisateurs



app.get('/allcommandes', (req, res) => {

    Users.find()
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




//connexion pour users2

app.get('/signin2', (req, res) => {

    const { username, password } = req.query;

    Users2.findOne({ username: username, password: password })
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


app.post('/boutons', (req, res) => {




    const commande = req.body;


    //find the user

        const { username, password } = req.query;

        Users.findOne({username: username, password: password})
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


   //envoyer au user connecte

    Users.updateOne({ username: username, password: password }, { $push: { commande: commande } })
        .then((user) => {
            if (user) {


            } else {
                res.json(false);
            }
        })
        .catch((err) => {
            console.error(err);
        });

}
);

//afficher les commandes

app.get('/commandes', (req, res) => {

   //afficher les commandes

    const { username, password, commande } = req.query;

    Users.findOne({ username: username, password: password, commande: commande })
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

//inscription
app.post('/signup', (req, res) => {
    console.log(req.body);
    const users = new Users({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        commande: req.body.commande



    })
    //save to database
    users.save().then(data => {
        res.json(data);
    });
});
//afficher toutes les commandes


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





