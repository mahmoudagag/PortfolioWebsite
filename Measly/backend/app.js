require('dotenv').config()
require('express-async-errors');

//extra securit packages
const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')
const rateLimiter = require('express-rate-limit')
const path = require('path')

const express = require('express')
const authenticateUser = require('./middleware/authentication')
const app = express()

//db
const connectDB = require('./db/connect');

//routers
const authRouter = require('./routes/auth')
const infoRouter = require('./routes/information')
const recipeRounter = require('./routes/recipe')
const favoriteRouter = require('./routes/favorite')
// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(express.json())
app.set('trust proxy',1)
app.use(rateLimiter({
  windowMs:15*60*1000, // 15 min
  max:100 // limit each IP to 100 requests per windowMs
}))
app.use(helmet())
app.use(xss())
app.use(cors())

app.use(express.static(path.join(__dirname,'build')))

app.get('/',(req,res) =>{
    res.sendFile(path.join(__dirname,'build','index.html'))
})

// routes
app.use('/api/auth',authRouter)
app.use('/api/api',authenticateUser,recipeRounter)
app.use('/api/info',authenticateUser,infoRouter)
app.use('/api/favorite',authenticateUser,favoriteRouter)

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start()