const express = require('express')
const app = express()
const myRoutes = './routes/tasks.routes.js' //routes file
const morgan = require('morgan') //middleware morgan request
const path = require('path') //express parth
const { mongoose } = require('./database') //import mongodb conection

const cors = require('cors')

//--------------------------settings------------------------------------
app.set('port', process.env.PORT || 3000)
app.use(express.json())
app.use(cors())


//--------------------------Midlewares------------------------------------
app.use(morgan('dev'))





//----------------routess-----------------------------------
app.use('/api/page', require(myRoutes))



//--------------------------static-------files------------------------------------
app.use(express.static(path.join(__dirname, 'public')))


//////------------------server start---------------------------------

app.listen(app.get('port'), () => console.log(`Example app listening on port ${app.get('port')}!`))