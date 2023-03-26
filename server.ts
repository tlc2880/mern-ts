import express, { Request, Response }  from 'express'
import path from 'path'
import logger from './middleware/logger'
import errorHandler from './middleware/errorHandler'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import corsOptions from './config/corsOptions'

const app = express()
const PORT = process.env.PORT || 3500
// @ts-expect-error
app.use(logger)

app.use(cors(corsOptions))

app.use(express.json())

app.use(cookieParser())

app.use('/', express.static(path.join(__dirname, 'public')))

app.use('/', require('./routes/root'))

app.all("*", (req: Request, res: Response) => {
    res.status(404)
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    } else if (req.accepts('json')) {
        res.json({ message: '404 Not Found' })
    } else {
        res.type('txt').send('404 Not Found')
    }
})

app.use(errorHandler)
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))