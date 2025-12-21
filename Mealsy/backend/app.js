import dotenv from "dotenv";
dotenv.config();
import 'express-async-errors';

import { fileURLToPath } from "url";
//extra securit packages
import helmet from 'helmet'
import cors from 'cors'
import xss from 'xss-clean'
import rateLimiter from 'express-rate-limit'
import path from 'path'

import express from 'express'
import authenticateUser from './middleware/authentication.js'
const app = express()
import cookieParser from 'cookie-parser';

//db
 
//routers
import authRouter from './routes/auth.js'
import infoRouter from "./routes/information.js";
import recipeRounter from './routes/recipe.js'
import favoriteRouter from './routes/favorite.js'
import protectedAuth from './routes/protectedAuth.js'
// error handler
import notFoundMiddleware from './middleware/not-found.js';
import errorHandlerMiddleware from './middleware/error-handler.js';

app.use(express.json())
// app.set('trust proxy',1)
app.use(rateLimiter({
  windowMs:15*60*1000, // 15 min
  max:100 // limit each IP to 100 requests per windowMs
}))
// app.use(helmet())
// app.use(xss())
app.use(cors({
  origin: ["http://localhost:3000", "https://mahmoudagag.com"],
  credentials: true
}))
app.use(cookieParser())

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "build")));

app.get('/',(req,res) =>{
    res.sendFile(path.join(__dirname,'build','index.html'))
})

// routes
app.use('/api/auth', authRouter)
app.use('/api/me', authenticateUser, protectedAuth)
app.use('/api/api',authenticateUser,recipeRounter)
app.use('/api/info',authenticateUser,infoRouter)
app.use('/api/favorite',authenticateUser,favoriteRouter)

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 7001;
const start = async () => {
  try {
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start()