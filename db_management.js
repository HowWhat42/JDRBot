const dotenv = require('dotenv')
dotenv.config()
const { MongoClient } = require('mongodb')
const uri = process.env.URI
const mongoclient = new MongoClient(uri, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
})

function connect_to_db(callback) {
  if (!mongoclient.isConnected()) {
    mongoclient.connect(function (err, client) {
      if (err) console.log(err);
      console.log("Connected successfully to server");
      callback(client);
    });
  } else {
    callback(mongoclient);
  }
}

function get_single(database, collection, info, callback) {
  connect_to_db(function (client) {
    client
      .db(database)
      .collection(collection)
      .findOne(info, function (err, res) {
        if (err) console.log(err);
        callback(res);
      });
  });
}

function get_multiple(database, collection, info, callback) {
  connect_to_db(function (client) {
    client
      .db(database)
      .collection(collection)
      .find(info)
      .toArray(function (err, res) {
        if (err) console.log(err);
        callback(res);
      });
  });
}

function set_single(database, collection, info, value, callback) {
  connect_to_db(function (client) {
    client
      .db(database)
      .collection(collection)
      .updateOne(info, value, { upsert: true }, function (err, res) {
        if (err) console.log(err);
        callback(res);
      });
  });
}

function insert_single(database, collection, value, callback) {
  connect_to_db(function (client) {
    client
      .db(database)
      .collection(collection)
      .insertOne(value, function (err, res) {
        if (err) console.log(err);
        callback(res);
      });
  });
}

function delete_single(database, collection, info, callback) {
  connect_to_db(function (client) {
    client
      .db(database)
      .collection(collection)
      .deleteOne(info, function (err, res) {
        if (err) console.log(err);
        callback(res);
      });
  });
}

exports.get = get_single;
exports.gets = get_multiple;
exports.set = set_single;
exports.delete = delete_single;
exports.insert = insert_single;
