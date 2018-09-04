//pozdrav z nucu a novy pozdrav ze surface a znovu z nucu


const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    let todo = new Todo({
        text: req.body.text
    });
    todo.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
    
});


app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({todos: todos})
    }, (e) => {
        res.status(400).send(e);
    });
});

app.get('/todos/:id', (req, res) => {
    let id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    };

    Todo.findById(id).then((todo) => {
        if(!todo) {
            return res.status(404).send("no data");
        }

        res.send({todo: todo})
    }).catch((e) => {
        res.status(400).send()
    })

    
})


app.delete('/todos/:id', (req, res) => {
    let id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Todo.findByIdAndRemove(id).then((hledaneTodo) => {
        if (!hledaneTodo) {
            return res.status(404).send("not found");
        }

        res.send({deleted: hledaneTodo});
    }).catch((e) => {
        res.status(404).send("error")
    });

});




app.listen(port, () => {
    console.log(`Started on port ${port}`);
    
});


//export pro mocha testovani
module.exports = {app: app};




