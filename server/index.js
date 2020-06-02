const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const utils = require('./utils.js');

// middlewares
async function todoHandler(req, res, next) {
    const { payload } = req.body;
    
    const id = utils.getSimpleId();
    const todo = {
      id: id,
      data: payload,
    }

    todos.push(todo);

    res.json(todo)
  
    return sendEventsToAll(todo);
}

function sendEventsToAll(todo) {
  clients.forEach(c => c.res.write(`data: ${JSON.stringify(todo)}\n\n`))
}

function eventsHandler(req, res, next) {
    
  // Mandatory headers and http status to keep connection open
  const headers = {
    'Content-Type': 'text/event-stream',
    'Connection': 'keep-alive',
    'Cache-Control': 'no-cache'
  };
  res.writeHead(200, headers);
  
  // After client opens connection send all nests as string
  const data = `data: ${JSON.stringify(todos)}\n\n`;
  res.write(data);

  // Generate an id based on timestamp and save res
  // object of client connection on clients list
  // Later we'll iterate it and send updates to each client
  const clientId = Date.now();
  const newClient = {
    id: clientId,
    res
  };
  clients.push(newClient);
  
  // When client closes connection we update the clients list
  // avoiding the disconnected one
  req.on('close', () => {
    console.log(`${clientId} Connection closed`);
    clients = clients.filter(c => c.id !== clientId);
  });

}

const app = express();

// Set cors and bodyParser middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
  next();
});

app.post('/todo', todoHandler);
app.get('/events', eventsHandler);
app.get('/status', (req, res) => res.json({clients: clients.length}));

const PORT = 5600;

let clients = [];
let todos = [];

app.listen(PORT, () => {
    
    const TODAY = (new Date()).toLocaleString();
    const IP_ADDRESS = utils.getIPAddress();

    console.log(`Server started: ${TODAY}`);
    console.log(`IP Address: ${IP_ADDRESS} Port: ${PORT}`);
    console.log(`Server-sent service is now running!`);

});
