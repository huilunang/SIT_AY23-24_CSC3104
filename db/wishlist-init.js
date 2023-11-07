// create database
travelexp = db.getSiblingDB(process.env.MONGO_INITDB_DATABASE);

// create user
travelexp.createUser({
  user: process.env.MONGO_DB_USER,
  pwd: process.env.MONGO_DB_PASSWORD,
  roles: [{ role: "readWrite", db: process.env.MONGO_INITDB_DATABASE }],
  mechanisms: ["SCRAM-SHA-1"],
});
