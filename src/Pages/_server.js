import express from 'express';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import path from 'path'
import cors from 'cors'
  
import https from 'https'
import fs from 'fs'

import cookieParser from 'cookie-parser';

dotenv.config() 
  
import routesAuth from './routes/routesAuth.js'
import routesUser from './routes/routesUser.js'
import routesChat from './routes/routesChat.js'
import routesTrip from './routes/routesTrip.js'
import routesAccommodations from './routes/routesAccommodations.js'
import routesRooms from './routes/routesRooms.js'
import routesPlaces from './routes/routesPlaces.js'
import routesRental from './routes/routesRental.js'
import routesMapBox from './routes/routesMapBox.js'
 
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
 

const app = express();

const allowedOrigins = [
    'https://139.162.8.143:3002',
    'http://139.162.8.143:3002',
    'https://localhost:3002',
    'http://localhost:3002',
    'capacitor://localhost',
    'https://139.162.8.143',
    'http://localhost:4200/'
]

const corsOptions = {
    // origin: allowedOrigins, 
    origin: "*",
    credentials: true,
    optionsSuccessStatus: 200,
    exposedHeaders: ["set-cookie"]
}

// Enable preflight requests for all routes
app.options('*', cors(corsOptions));
app.use(cors(corsOptions))

// app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
 
app.use(cookieParser())
// app.use(express.static(path.join(__dirname, 'public_html/src/')))
app.use(express.static(path.join(__dirname, `${process.env.ENV_LOCAL}/public_html/src/`)))

//home page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, `${process.env.ENV_LOCAL}/public_html/src/index.html`))
})
 

let httpsOptions = {
    key: fs.readFileSync('./nginxmobilewatatrip.key'),
    cert: fs.readFileSync('./nginxmobilewatatrip.crt')
}
 
const httpsServer = https.createServer(  app )
// const httpsServer = https.createServer( httpsOptions, app ) 

//login and register
app.use('/auth', routesAuth)

//user edit and (soft) delete
app.use('/users', routesUser)

//chat
app.use('/chats', routesChat)

//trip
app.use('/trip', routesTrip)

//accommodations
app.use('/accommodations', routesAccommodations)

// rentals
app.use('/rentals', routesRental)

//rooms
app.use('/rooms', routesRooms)

//places

try {
   app.use('/places', routesPlaces)
} catch (error) {
   console.error("error occured ", error)
}

//mapbox testing
app.use('/mapbox', routesMapBox)

//for testing
// app.use('/', routesHome)


//page not found
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, `${process.env.ENV_LOCAL}/public_html/src/404.html`))
})
app.use((err, req, res, next) => {
    const errorStatus = err.status || 500
    const errorMessage = err.message || "Something went wrong"
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack
    })
})

  

const port = 3088
httpsServer.listen(port, () => {
    console.log(`NodeJS Server is running at port ${port}`)
})