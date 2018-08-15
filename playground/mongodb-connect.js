// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb'); //object destructuring

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err){
        return console.log('unable to connect to mongoDB server');
        
    }
    console.log('connected to mongoDB');

    // db.collection('Todos').insertOne({
    //     text: 'something to do',
    //     completed: false
    // }, (err, result) => {
    //     if (err) {
    //         return console.log('unable to insert todo', err);  
    //     }

    //     console.log(JSON.stringify(result.ops, undefined, 2));
        
    // });

    // db.collection('Users').insertOne({
    //     name: 'Eso',
    //     age: 33, 
    //     location: 'Nydnol'
    // }, (err, result) => {
    //     if (err) {
    //         return console.log('unable to insert user'. err);
    //     }
    //     console.log(JSON.stringify(result.ops, undefined, 2));
        
    // });

    db.close()
})