
const {MongoClient, ObjectID} = require('mongodb'); //object destructuring

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err){
        return console.log('unable to connect to mongoDB server');
        
    }
    console.log('connected to mongoDB');

  db.collection('Todos').deleteMany({text: 'Eat Lunch'}).then((result) => {
      console.log(result);
      
  });

    // db.close()
});