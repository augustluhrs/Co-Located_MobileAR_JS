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
      // console.log(!document.querySelector("[camera]").hasOwnProperty("avatar"));
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

  //make sure this only happens once per client
  camera.avatar = true //later could add the entity, but what does that give us?

  //instantiate a sphere entity by telling the server your transform (w/ position offset)
  //need getWorldPosition? why not?
  // let camPos = camera.object3D.position;
  let camRot = camera.object3D.rotation;
  //testing keeping the camera as origin, need to adjust this later to be real, just test for now
  let camPos = marker.object3D.position.multiplyScalar(-1);
  let avatarID = "avatar-" + socket.id;
  let avatar = {
    position: {
      x: camPos.x - 0.5,
      y: camPos.y,
      z: camPos.z + 5, //adjust later
    },
    rotation: { //a-frame doesn't use quaternions by default
      x: camRot.x,
      y: camRot.y,
      z: camRot.z,
    },
    scale: {
      uniform: 1,
    },
    color: "#93a808",
  }
  
  socket.emit("add", {mapID: avatarID, props: avatar});

  //not attaching the avatar to the camera, just for testing and to see how bad drift is
}
