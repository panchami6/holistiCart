const mongoose = require("mongoose")

// const CONNECT_DB = process.env['TOKEN_SECRET']

// TODO: move to .env/sec
async function initializeDBConnection() {
  try{
    mongoose.connect("mongodb+srv://panchami_thulupule:Oreo@061097@neog-cluster.uitia.mongodb.net/inventory?retryWrites=true&w=majority",
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true 
  })
  console.log("successfully connected to db");
  } catch(error){
    console.error("mongoose connection failed...", error)
  }
}

module.exports = { initializeDBConnection }