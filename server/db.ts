import { MongoClient } from "mongodb";
const connectionString = 'mongodb://localhost:27017';
const client = new MongoClient(connectionString, {});

let dbConnection: any;

module.exports = {
  connectToServer: function (callback: Function) {
    client.connect(function (err: any, db: any) {
      if (err || !db) {
        return callback(err);
      }

      dbConnection = db.db("shetland_dictionary");
      console.log("Successfully connected to MongoDB.");

      return callback();
    });
  },

  getDb: function (): any {
    return dbConnection;
  },
};