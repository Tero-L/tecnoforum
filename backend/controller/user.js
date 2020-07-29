const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const userRouter = require('express').Router()
const User = require('../models/user')
const Comments = require('../models/comment')
const logger = require('../utils/logger')

userRouter.get('/api/users', (request, response,next) => {
    User
        .find({})
        .then(users => {
            response.json(users.map(p => p.toJSON()))
        })
        .catch(error => next(error))
})
/* virhettä ei toimi

userRouter.get('/api/userscomments', async (request, response,next) => {  
    
    try{
        const users = 
            await User
                    .find({})
                    //.populate('Comment', { comment: 1, date: 1 })
                    .populate('Comments')

                    response.json(users.map(u => u.toJSON()))
        } catch (exception) {
        // tulee DeprecationWarning: Mongoose: `findOneAndUpdate()` and `findOneAndDelete()` without the `useFindAndModify` option set to false are deprecated. See: https://mongoosejs.com/docs/deprecations.html#findandmodif
        next(exception)
    }

    
})
*/

userRouter.get('/api/users/name/:name', (request, response, next) => {
    console.log('/api/users/name', request.params.name)
    User
        .findOne({nickname: request.params.name}) 
        .then(user => {
            console.log("user: ", user)
            if(user){
                response.json(user.toJSON())
            }
            else {
                response.json('nothing found')
            }

        })
        .catch(error => next(error))
})

userRouter.get('/api/users/id/:id', (request, response, next) => {
    console.log('/api/users/id', request.params.id)
    console.log(typeof request.params.id)
    User
        .findById(request.params.id)
        .then(user =>{
            console.log(`user ${user} with id ${request.params.id}`)
            if(user) response.json(user.toJSON())
            else response.json('nothing found')
        })
        .catch(error => next(error))
})

userRouter.post('/api/users/', async (request, response, next) => {
    //console.log("post: ", request.body)
    const body = request.body

    if(body.password.length < 8) return response.status(401).json({ error: 'password too short or long'})

    const saltrounds = 10

    const passwordHash = await bcrypt.hash(body.password, saltrounds)
    //console.log('Hashed pwd: ', passwordHash)
    
    const user = new User({
        //fullname: body.fullname,
        password: body.password,
        passwordHash: passwordHash,
        email: body.email,
        nickname: body.nickname,
        userType: body.userType
    })

    user.save()
        .then(result => {
            //console.log('post result: ', result)
            response.status(201).json(result)
        })
        .catch(error => next(error))
})

const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if(authorization && authorization.toLowerCase().startsWith('basic ')) {
        return authorization.substring(6)
      }
    else if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      return authorization.substring(7)
    }
    return null
  }
userRouter.delete('/api/users/:id', async (request, response, next) => {
    
    const body = request.body  
    const token = getTokenFrom(request)
    
    // vain admin voi poistaa käyttäjätilin
    try{
        
        const decodedToken = jwt.verify(token, process.env.SECRET)

        if (!token || !decodedToken.id) {
            //return response.status(401).json({ error: 'token missing or invalid' })
            throw('error: token missing or invalid')
        }
        const user = await User.findById(decodedToken.id)
        if(!user) {            
            throw('error: something wrong with token, user not found')
            //return response.status(400).json({error: 'something wrong with token, user not found'})
        }        
        //console.log('user ids: ', user._id, request.params.id)
        //console.log('am I user? ', user._id.equals(request.params.id))
        //console.log('am I admin? ', user.userType === "admin")
        
        if(user.userType === "admin" || user._id.equals(request.params.id)) { 
          
            //var error = ''
            await User.findByIdAndRemove(request.params.id, function(err,res){
                if(err) throw ('error: user to be removed not found')
                if(!res && !err) response.status(401).json({error: 'user to be removed not found'})
                else {
                    // update commnents, threads with user Id -1 tai jotain
                    response.status(204).end() //json({message: 'success'}) //(`message: user ${request.params.id} removed`) // msg not               
                }
            })
        } else {
            //return response.status(401).json({ error: 'unauthorized admin delete operation'})
            throw('unauthorized admin delete operation')
        }     
        
      } catch (error) {                 
            //logger.error(error)
            return response.status(401).json({ error: error})
      }
    })
    
userRouter.put('/api/users/', async (request, response, next) => {
    
    const body = request.body  
    //console.log('put request body:  ', body.email, request.header.Authorization)
    const token = getTokenFrom(request)
    
    // tarkista olenko admin tai käyttäjä itse
    try{
        const decodedToken = jwt.verify(token, process.env.SECRET)
        
            if (!token || !decodedToken.id) {
                throw('error: token missing or invalid')
                //return response.status(401).json({ error: 'token missing or invalid' })
        }
        const modifying_user = await User.findById(decodedToken.id)
        // testauksessa käynyt että käännösten/ajojen välillä aikaisempi token
        // ilmeisesti vanhentunut, eikä tuo token tarkistus palauta virhettä 
        if(!modifying_user) {
            throw('error: something wrong with token, modifying user not found')
            //return response.status(400).json({error: 'something wrong with token, user not found'})
        }

        if(modifying_user.userType === "admin" || modifying_user.id === body.id) {
            //console.log(`attempting to update userdata  ${JSON.stringify(body)}`)
            
            const updatedUser = await User.findOneAndUpdate(                
                {_id: body.id}, 
                {$set:{ nickname: body.nickname, 
                        //fullname: body.fullname, 
                        email: body.email,  
                        userType: body.userType,
                        description: body.description
                        }}, 
                {new: true, omitUndefined: true, runValidators: true, context: 'query' }, // to return updated doc and skip undefined variables
                function(err,res) {           
                    //console.log(`findOneAndUpdate err ${err}, res ${res}`)         
                    if(err) {
                        // hmm mitähän tulisi tehdä virheen kanssa, catch lopussa ottaa kopin...
                        // pieni BUGI! Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
                        //return response.status(400).json({err: err.message})
                        
                    }
                } 
            )

            //console.log('findoneandupdate returned: ', updatedUser)
            if(!updatedUser) {
                logger.info('user data to be updated not found')
                return response.status(400).json({error: 'user data to be updated not found'})
            }
            // put ei palauta mitään bodya jos laittaa koodin 204?
            // return response.status(204).json(updatedUser.toJSON())
            //if(!err)
            return response.status(200).json(updatedUser.toJSON())
        }
        else return response.status(401).json({ error: 'unauthorized admin/user update operation'})
        
    } //catch (exception) {
       // next(exception)
   // }
    catch(error){
        //logger.error(error)
        //return response.status(401).json({ error: error.name})
        next(error)
    }
    
})


module.exports = userRouter

