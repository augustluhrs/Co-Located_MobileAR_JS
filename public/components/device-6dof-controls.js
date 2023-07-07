//
//  the component that takes the browser events 'deviceorientation' and 'devicemotion'
//  and uses them to offset the 3D scene (the "map" entity, specifically)
//  these events aren't going to work on safari at all or anything but chrome reliably
//

// making this global for testing, want to read them in the show-camera HUD
let mapPos = new THREE.Vector3();
let mapRot = new THREE.Vector3(); //data comes in Euler, annoying, not sure if need to convert to quaternion

AFRAME.registerComponent('device-6dof-controls', {
  init: function () {
    //are these bindings needed? not using them in the other components... b/c window event?
    this.handleDeviceOrientation = this.handleDeviceOrientation.bind(this);
    this.handleDeviceMotion = this.handleDeviceMotion.bind(this);
    // window.addEventListener('deviceorientation', this.handleDeviceOrientation);
    // window.addEventListener('devicemotion', this.handleDeviceMotion);
    //idk why i need true either
    window.addEventListener('deviceorientation', this.handleDeviceOrientation, true);
    window.addEventListener('devicemotion', this.handleDeviceMotion, true);

    this.map = document.querySelector("#map");
    this.acc = new THREE.Vector3(); //using this to add to mapPos so don't have to create new vector each event
  },

  handleDeviceOrientation: function (event) {
    // https://developer.mozilla.org/en-US/docs/Web/API/Window/deviceorientation_event

    //reads current orientation, not change, so just replacing rotation
    //need to check for null b/c doesn't work on desktop (no device motion)
    //doing negative everything because it's moving the opposite of the phone
    if (event.beta !== null){
      mapRot.set(-event.beta, -event.gamma, -event.alpha); //this is just for show-camera
    
      this.map.object3D.rotation.set(
        THREE.MathUtils.degToRad(-event.beta),
        THREE.MathUtils.degToRad(-event.gamma),
        THREE.MathUtils.degToRad(-event.alpha),
      )
    }
    // console.log("rotation");
    // console.log(event);
  },

  handleDeviceMotion: function (event) {
    // https://developer.mozilla.org/en-US/docs/Web/API/DeviceMotionEvent

    //the motion event, on the other hand, doesn't track "current Position",
    //it tracks how much position has changed, and it's m/s^2... 
    //if getting acceleration, should i be doing some velocity calculations? nahhhhhh
    //if this isn't being mapped very reliably, might have to look at event.interval and do some shit
    
    //so if i'm getting a number in meters per second squared... do i need to take .interval to find the actual meter distance?
    //lets just log for now and see what we get
    if (event.acceleration.x !== null){
      this.acc.set(-event.acceleration.x, -event.acceleration.y, -event.acceleration.z);
      mapPos.add(this.acc); //this is just for show-camera
      
      this.map.object3D.position.add(this.acc);
    }
    // console.log("position");
    // console.log(event);
  }
});
