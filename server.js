const mongoose = require("mongoose");
const app = require('./app')
const dotenv = require("dotenv");
//
dotenv.config({ path: './config.env' });


const DB = process.env.MONGO_URI

mongoose.connect(DB, {}).then((conn) => { 
  console.log(conn.Connection)
});

const PORT =  process.env.PORT || 4500;

app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`)
});
// this is amazing
