const mongoose = require('mongoose')

// siirrä ensin requestit controller moduuliin, sen jälkeen ota tämä models/blog.js
// käyttöön

const userSchema = mongoose.Schema({
    fullname: String,
    password: String,
    email: String,
    nickname: String
  })

  userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })
  
  module.exports = mongoose.model('Users', userSchema, 'user')