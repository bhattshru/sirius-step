var MongoClient = require('mongodb').MongoClient;

module.exports = {
  createConnection: function() {

    MongoClient.connect("").then(client=> {
            console.log('Connection established');
            module.exports.database=client.db('step-projector-app');
    }).catch(err=>{
      console.error('Unable to connect to the mongoDB server. Error:', err);

    })
  },
}
