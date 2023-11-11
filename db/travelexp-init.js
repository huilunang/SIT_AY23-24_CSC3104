// create database
travelexp = db.getSiblingDB(process.env.MONGO_DATABASE);

// create user
travelexp.createUser({
  user: process.env.MONGO_USER,
  pwd: process.env.MONGO_PASSWORD,
  roles: [{ role: "readWrite", db: process.env.MONGO_DATABASE }],
  mechanisms: ["SCRAM-SHA-1"],
});
