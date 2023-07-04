/**
 *        *~*~**~*~*~*~*
 *      ~*~*~ SERVER ~*~*~* 
 *        *~*~*~*~*~*~*~
 */

//
// CREATE SERVER
//

let port = process.env.PORT || 8000;
let express = require('express');
let app = express();
let server = require('http').createServer(app).listen(port, ()=>{
  console.log('Server is listening at port: ', port);
});

//where we look for files
app.use(express.static('public'));

//create socket connection
let io = require('socket.io')(server);

//
// STATE VARIABLES
//

// object that contains all instantiated client objects
// the unit scale 1 = width of marker, multiplied by each client's relative scale
// might not need to record ownership via clientid suffix in first version
let map = {
  /*
  { "example-box-clientid":
    position: {
      x: 0,
      y: 0,
      z: 0,
    },
    rotation: { //a-frame doeesn't use quaternions by default
      x: 0,
      y: 0,
      z: 0,
    },
    scale: {
      uniform: 1,
    },
    color: "#93a808",
  }
  */
}

// 
//  UPDATE LOOP
//

setInterval(()=>{
  //for now just updating networked objects
  updateNetwork();
});

function updateNetwork(){
  io.emit("serverUpdate", map);
}

//
// DEFAULT CLIENTS
//

let players = io.of('/')
//listen for anyone connecting
players.on('connection', (socket)=>{
  console.log('new player client!: ' + socket.id);
  
  socket.on("add", (data)=>{
    map[data.mapID] = data.props;
    console.log(map);
    // io.emit() //doing this in update
  })

  //listen for this client to disconnect
  socket.on('disconnect', ()=>{
    console.log('this player client disconnected: ' + socket.id);
  });
  
});

