const mongoose = require("mongoose")

// TODO: move to .env/sec
async function initializeDBConnection() {
  try{
    mongoose.connect("mongodb+srv://panchami_thulupule:Oreo@061097@neog-cluster.uitia.mongodb.net/inventory?retryWrites=true&w=majority",
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false
  })
  console.log("successfully connected to db");
  } catch(error){
    console.error("mongoose connection failed...", error)
  }
}

module.exports = { initializeDBConnection }