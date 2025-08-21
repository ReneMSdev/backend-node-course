// The address of this server connected to the network is:
// URL -> http://localhost:8383
// IP -> 127.0.0.1:8383

const express = require('express')
const app = express()
const PORT = 8383

let data = ['james']

// Middleware
app.use(express.json())

// HTTP VERBS && Routes (or paths)
// The method informs the nature of the request and the route is a futher subdirectory (basically we direct the request to the body of code to respond appropriately, and these locations or routes are called endpoints)

// Type 1 - Website endpoints (these are for sending back html and they typically come when a user enters a url in a browser)
app.get('/', (req, res) => {
  // this is endpoint number 1 - /
  console.log('User requested the home page website', req.method)
  res.send(`
      <body
      style="background:pink;
      color:blue;">
        <h1>DATA:</h1>
        <p>${JSON.stringify(data)}</p>
        <a href="/dashboard">Dashboard</a>
        <script>console.log('This is my script!')</script>
      </body>
    `)
})

app.get('/dashboard', (req, res) => {
  res.send(`
    <body>
    <h1>dashboard</h1>
    <a href="/">Home</a>
    
    </body>

    
    `)
})

// Type 2 - API endpoints

// CRUD-method ~ create-post read-get update-put and delete-delete

app.get('/api/data', (req, res) => {
  console.log('This one was for data')
  res.status(599).send(data)
})

app.post('/api/data', (req, res) => {
  // someone wants to create a user (sign up button)
  // user clicks sign up button after entering credentials, and their browser is wired to send out a network request to the server to handle that action
  const newEntry = req.body
  console.log(newEntry)
  data.push(newEntry.name)
  res.sendStatus(201)
})

app.delete('/api/data', (req, res) => {
  data.pop()
  console.log('We deleted the element off the end of the array')
  res.sendStatus(203)
})

app.listen(PORT, () => console.log(`Server has started on: ${PORT}`))
