let socket = io.connect();
let m = {}; //all objects in map. idk if m is right thing, but i think "map" should be the entity

socket.on("connect", ()=>{
  console.log("connected to server as: " + socket.id);
  //if connecting mid-way will need to get map from server
});

socket.on("serverUpdate", (data)=>{
  //update the map object, networked components handle their own update via eventListener?
  // map = data; //issue if async while components are updating?
  //ah, can't do above because then "isInstantiated is never saved"
  let map = document.querySelector("#map");
  // let marker = document.querySelector("#marker-1");

  //need to instantiate new entities b/c they don't have the networked component yet
  for (let mapID in data){
    if (m.hasOwnProperty(mapID)){
      //existing object, update props
      m[mapID] = data[mapID];
      //components do the smoothing to this target
    } else {
      //new object, update map and instantiate
      console.log("new map object: " + mapID);
      m[mapID] = data[mapID];
      
      var sceneEl = document.querySelector('a-scene');
      var entityEl = document.createElement('a-sphere');
      entityEl.setAttribute('networked', {
        mapID: mapID
      });
      entityEl.setAttribute("id", mapID);

      //need to create relative position from networked transform by rotating offset vector? have to offset from marker for sure
      let networkPos = new THREE.Vector3().fromArray(m[mapID].posArray);
      // networkPos.addVectors(networkPos, document.querySelector("#marker-1").object3D.position);
      // let networkQuat = new THREE.Quaternion().fromArray(map[mapID].quatArray);
      // networkPos.applyQuaternion(networkQuat);
      console.log(JSON.stringify(networkPos));
      entityEl.object3D.position.set(networkPos.x, networkPos.y, networkPos.z);
      entityEl.setAttribute('material', 'color', m[mapID].color);
      // sceneEl.appendChild(entityEl);
      //if appending to the marker, won't have to offset and won't always be behind camera... realistically, need to parent to something else and have the marker update that entity's position
      //fuck, but then i'll have to convert world to local space...
      
      let worldToLocal = new THREE.Matrix4().getInverse(map.object3D.matrixWorld);
      entityEl.object3D.applyMatrix(worldToLocal);
      console.log(entityEl.object3D.position);
      map.appendChild(entityEl);
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
