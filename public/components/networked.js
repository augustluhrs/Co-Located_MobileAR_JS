let socket = io.connect();
let map = {};

socket.on("connect", ()=>{
  console.log("connected to server as: " + socket.id);
  //if connecting mid-way will need to get map from server
});

socket.on("serverUpdate", (data)=>{
  //update the map object, networked components handle their own update via eventListener?
  // map = data; //issue if async while components are updating?
  //ah, can't do above because then "isInstantiated is never saved"

  //need to instantiate new entities b/c they don't have the networked component yet
  for (let mapID in data){
    if (map.hasOwnProperty(mapID)){
      //existing object, update props
      map[mapID] = data[mapID];
      //components do the smoothing to this target
    } else {
      //new object, update map and instantiate
      console.log("new map object: " + mapID);
      map[mapID] = data[mapID];
      
      var sceneEl = document.querySelector('a-scene');
      var entityEl = document.createElement('a-box');
      entityEl.setAttribute('networked', {
        mapID: mapID
      });
      entityEl.object3D.position.set(map[mapID].position.x, map[mapID].position.y, map[mapID].position.z);
      entityEl.object3D.rotation.set(map[mapID].rotation.x, map[mapID].rotation.y, map[mapID].rotation.z);
      entityEl.setAttribute('material', 'color', map[mapID].color);
      sceneEl.appendChild(entityEl);

      var boxEl = document.createElement('a-box');
      // boxEl.setAttribute('networked', {
      //   mapID: mapID
      // });
      boxEl.object3D.position.set(map[mapID].position.x, map[mapID].position.y, -map[mapID].position.z);
      boxEl.object3D.rotation.set(map[mapID].rotation.x, map[mapID].rotation.y, map[mapID].rotation.z);
      boxEl.setAttribute('material', 'color', 'red');
      sceneEl.appendChild(boxEl);
    }
  }
});

//ahh, going to have to make a map entity that all the objects are children of, and have the component on that
AFRAME.registerComponent('networked', { //networked-manager vs networked-object?
  schema: {
    mapID: {type: 'string'}
  },
  init: function () {
    var en = this.el; //this vs me vs en(tity)?

    // en.addEventListener('serverUpdate', ()=>{
    //   //update all networked entities
    //   console.log("component listening");
    // });
  }
});
