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

    marker.addEventListener('markerFound', ()=>{
      var markerId = marker.id;
      console.log('markerFound', markerId);
      marker.isFound = true;
      //one-time instantiation of box to show client position offset
      if (!document.querySelector("[camera]").hasOwnProperty("avatar")){
        makeClientAvatar(marker);
      }
    });

    marker.addEventListener('markerLost', ()=>{
      var markerId = marker.id;
      console.log('markerLost', markerId);
      // want to stop the distance display if not detected
      marker.isFound = false;
    });
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
