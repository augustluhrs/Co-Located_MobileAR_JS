//
//  EVENTS
//

window.addEventListener('camera-init', (data) => {
  console.log('camera-init', data);
})

window.addEventListener('camera-error', (error) => {
  console.log('camera-error', error);
})

AFRAME.registerComponent('marker-events', {
  init: function () {
    var marker = this.el;

    this.markerWorldPos = new THREE.Vector3();
    this.mapWorldQuat = new THREE.Quaternion();
    this.mapLocalQuat = new THREE.Quaternion();
    this.mapDesiredQuat = new THREE.Quaternion();

    marker.addEventListener('markerFound', ()=>{
      var markerId = marker.id;
      console.log('markerFound', markerId);
      marker.isFound = true;
      //one-time instantiation of box to show client position offset
      if (!document.querySelector("[camera]").hasOwnProperty("avatar")){
        makeClientAvatar(marker);
      }

      //update the map's transform
      let map = document.querySelector("#map");
      // let pos = marker.object3D.position;
      let rot = marker.object3D.rotation;
      // map.object3D.position.set(pos.x, pos.y, pos.z);
      // map.object3D.rotation.set(THREE.MathUtils.degToRad(rot.x),THREE.MathUtils.degToRad(rot.y),THREE.MathUtils.degToRad(rot.z)); //this is so silly
      
      //now have to convert from world to local for position translation
      marker.object3D.getWorldPosition(this.markerWorldPos); //should be same as local, but w/e
      map.object3D.worldToLocal(this.markerWorldPos);
      map.object3D.position.copy(this.markerWorldPos);

      //for rotation, get worldQuat, multiply by local rot to get desired? then set to desired?
      // map.object3D.getWorldQuaternion(this.mapWorldQuat);
      this.mapLocalQuat.copy(map.object3D.quaternion);
      marker.object3D.getWorldQuaternion(this.mapDesiredQuat);
      this.mapDesiredQuat.multiply(this.mapLocalQuat);
      this.mapDesiredQuat.normalize();
      map.object3D.setRotationFromQuaternion(this.mapDesiredQuat);
    });

    marker.addEventListener('markerLost', ()=>{
      var markerId = marker.id;
      console.log('markerLost', markerId);
      // want to stop the distance display if not detected
      marker.isFound = false;

      
    });
  },

  tick: function(){
    // this.el.object3D.visible = true;
  }
});


function makeClientAvatar(marker){
  // Get the camera element
  let camera = document.querySelector("[camera]");
  // let marker = document.querySelector("#marker-1"); //TODO multiple markers

  //make sure this only happens once per client
  camera.avatar = true //later could add the entity, but what does that give us?

  //instantiate a sphere entity by telling the server your transform 
  //networked transform of client = 
  //      position = marker.pos * -1 (vector to phone)
  //      rotation = marker.rot (so other clients know how to rotate the pos vector)
  // doesn't actually track local rotation yet
  let pos = new THREE.Vector3();
  let quat = new THREE.Quaternion();
  marker.object3D.getWorldPosition(pos);
  marker.object3D.getWorldQuaternion(quat);
  pos.multiplyScalar(-1);
  quat.normalize();
  // let camPos = camera.object3D.position;
  // let camRot = camera.object3D.Rotation;
  let avatarID = "avatar-" + randomID() + ":" + socket.id;
  let avatar = {
    // position: {
    //   x: pos.x,
    //   y: pos.y,
    //   z: pos.z,
    // },
    posArray: pos.toArray(),
    quatArray: quat.toArray(), //will need to make quaternion on the other side with .fromArray() and then .applyQuaternion
    // rotation: { //a-frame doesn't use quaternions by default... hmm...
    //   x: camRot.x,
    //   y: camRot.y,
    //   z: camRot.z,
    // },
    scale: {
      uniform: 1,
    },
    color: "#93a808",
    // group: "red" //need?
  }
  
  socket.emit("add", {mapID: avatarID, props: avatar});

  //not attaching the avatar to the camera, just for testing and to see how bad drift is
}
