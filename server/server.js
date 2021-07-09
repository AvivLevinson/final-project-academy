const express = require('express');
const cors = require('cors');
const http = require('http');
const mongoose = require('mongoose');
const routes = require('./routes');

const PORT = 5000 || process.env.PORT;

const app = express();
const server = http.createServer(app);

const io = require('./socket.js').init(server);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({limit: '50mb'}));
app.use(express.static('./public'));

app.use('/covid-insulated', routes);

io.on('connection', (socket) => {
  console.log(`Connection has been made!! id:${socket.id}`);
});


mongoose.connect("mongodb+srv://supervisoradmin:sce2021!!@dev-final-project.kidob.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.on("error", err => {
    console.log("err", err)
  })

  mongoose.connection.on("connected", (err, res) => {
    if(err){
      console.log(err)
      return;
    }

    server.listen( PORT,() =>
    console.log(`Server has started.`)
  );
  })  





