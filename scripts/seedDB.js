const mongoose = require("mongoose");
const db = require("../models");

mongoose.connect(
    process.env.MONGODB_URI ||
    "mongodb://localhost/portal", 
    { useUnifiedTopology: true,
      useNewUrlParser: true }  
  );

  const roleSeed = [
      {
          name: "admin"
      },
      {
          name: "user"
      },
      {
        name: "mod"
      }
  ];

db.Role
.deleteMany({})
.then(()=> db.Role.collection.insertMany(roleSeed))
.then(data => {
  console.log(data.result.n + " records inserted!");
  process.exit(0);
})
.catch(err => {
  console.error(err);
  process.exit(1);
});

