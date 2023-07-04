let socket = io.connect();
let map = {};

socket.on("connect", ()=>{
  console.log("connected to server as: " + socket.id);
  //if connecting mid-way will need to get map from server
});

socket.on("serverUpdate", (data)=>{
  //update the map object, networked components handle their own update via eventListener?
  map = data; //issue if async while components are updating?
  //need to instantiate new entities b/c they don't have the networked component yet
  // console.log(map);
  for (let mapID in map){
    console.log(mapID);
    if (!map[mapID].hasOwnProperty("isInstantiated")){
      //create new one once
      map[mapID].isInstantiated = true;
      // console.log("new map object: " + mapID);
    }
  }
});

AFRAME.registerComponent('networked', {
  init: function () {
    var en = this.el; //this vs me vs en(tity)?

    marker.addEventListener('serverUpdate', ()=>{
      //update all networked entities
    });
  }
});
