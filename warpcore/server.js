import express from 'express'
import bodyParser from 'body-parser'
import { request, GraphQLClient } from 'graphql-request'
const app = express()

const PORT = 1337
const GRAPHQL = 'http://localhost:8000/graphql'

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static('public'))
app.set('view engine', 'ejs')

app.get('/', async (req, res, next) => res.render('index'))
app.post('/', async (req, res, next) => {
    try {
        console.log(req.body)
        console.log(req.headers.authorization)

        const client = new GraphQLClient('GRAPHQL', {
            headers: { Authorization: req.headers.authorization },
        })

        const query = `{
            Movie(title: "Inception") {
                releaseDate
                actors {
                name
                }
            }
        }`

        const response = await client.request(query)

        return res.render('results', {
            response
        })
    } catch (e) {
        throw e
    }
})



app.listen(PORT, () => console.log("Server started on port: " + PORT))