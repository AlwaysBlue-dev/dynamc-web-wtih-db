const mongoose = require("mongoose");

//creating db
mongoose
  .connect("mongodb://localhost:27017/dynamicWeb", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Data base connected successfully");
  })
  .catch((error) => {
    console.log(error);
  });
