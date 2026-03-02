import express from 'express' 
import colors from 'colors'
import morgan from 'morgan'
import { db } from './config/db'
import authRouter from './routes/authRouter'
import paymentRouter from './routes/paymentRouter'
import reserveRouter from './routes/reserveRouter'
import serviceRouter from './routes/serviceRouter'

async function connectDB() {
    try {
        await db.authenticate()
        db.sync()
        console.log( colors.blue.bold('Conexion existosa con la BD'))
    } catch (error) {
        console.log(error)
        console.log( colors.red.bold('Fallo la Conexion con la BD'))
        
    }
}
connectDB()

const app = express()

app.use(morgan('dev'))

app.use(express.json())

app.use('/api/auth', authRouter)

app.use('/api/payment', paymentRouter)

app.use('/api/reserve', reserveRouter)

app.use('/api/service', serviceRouter)

export default app