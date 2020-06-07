const mongoose = require('mongoose')
require('dotenv').config()

/*
if ( process.argv.length<3 ) {
  console.log('give password as argument')
  process.exit(1)
}
*/
//const password = process.argv[2]

const url = process.env.MONGODB_URI
  //`mongodb+srv://fullstack:${password}@cluster0-ostce.mongodb.net/tecnoforum_db?retryWrites=true`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

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

  const User = mongoose.model('user', userSchema, 'user')

  /*
  const user = new User({
    fullname: 'kalle kustaa',
    password: 'korkki',
    email: 'kallekustaa@mail.com',
    nickname: 'Gustav'
  })

  user.save().then(response => {
      console.log('user saved')
  })

*/

/*
const name = 'kalle kustaa'

  User
    .findOne({ fullname: `${name}` }, function (error, user) {
    console.log("Error: " + error);
    console.log("User: " + user);
    //mongoose.connection.close()
    })
   .then( () => {
      //console.log('Is this the right way? ')
      mongoose.connection.close()
  })
  */

  const id = '5edaaa175521736e1898f736'

  User
    .findById(id, function (err, docs) { 
      if (err){ 
          console.log(err)
      } 
      else{ 
          console.log("Result : ", docs)
      }
    }) 
   .then( () => {
      mongoose.connection.close()
    })
    

  //})
/*
  User.find({})
    .then(result => {
      result.forEach(n => {
         console.log(n)
      })  
      mongoose.connection.close()
    })
  */
    
    
