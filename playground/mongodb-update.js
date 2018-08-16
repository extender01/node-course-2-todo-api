
const {MongoClient, ObjectID} = require('mongodb'); //object destructuring

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err){
        return console.log('unable to connect to mongoDB server');
        
    }
    console.log('connected to mongoDB');

 db.collection('Todos').findOneAndUpdate({
     _id: new ObjectID('5b74167c3eb06f387ccdd0ef')
    }, {
        $set: {
            completed: true
        }
    }, {
        returnOriginal: false
    }).then((result) => {
        console.log(result);
        
    });

    // db.close()
});