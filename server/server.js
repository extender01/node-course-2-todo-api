require('./config/config');


const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');

const app = express();
const port = process.env.PORT;

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

app.patch('/todos/:id', (req, res) => {
    let id = req.params.id;
   //pick je z lodashe, vezme prozkouma properties z req.body a vytahne do promenne body ty, ktere jsou uvedeny v array v druhem parametru (pokud existuji)
    let body = _.pick(req.body, ['text', 'completed']);

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    };

    if (_.isBoolean(body.completed) && body.completed) {
         body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    };

    //do vybrane polozky v db podle id se zapisou nove vlastnosti co jsou v objektu body, new: true znamena aby jako navratova hodnota fce byly ty nove udaje
    Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
        if(!todo) {
            return res.status(404).send();
        };

        res.send({todo: todo});
    }).catch((e) => {
        res.status(400).send();
    });
});




app.listen(port, () => {
    console.log(`Started on port ${port}`);
    
});


//export pro mocha testovani
module.exports = {app: app};




