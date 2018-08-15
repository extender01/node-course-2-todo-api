
const {MongoClient, ObjectID} = require('mongodb'); //object destructuring

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err){
        return console.log('unable to connect to mongoDB server');
        
    }
    console.log('connected to mongoDB');

    // db.collection('Todos').find({_id: new ObjectID('5b73f0253eb06f387ccdc1fd')}).toArray().then((docs) => {

    //     console.log('Todos:');
    //     console.log(JSON.stringify(docs, undefined, 2));
        
        

    // }, (err) => {
    //     console.log('unable to fetch todos', err);
        
    // })



    db.collection('Todos').find().count().then((count) => {

        console.log(`todos count: ${count}`);
        
        //console.log(JSON.stringify(docs, undefined, 2));
        
        

    }, (err) => {
        console.log('unable to fetch todos', err);
        
    })

    // db.close()
})