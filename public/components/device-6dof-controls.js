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
    window.addEventListener('deviceorientation', this.handleDeviceOrientation, true);
    window.addEventListener('devicemotion', this.handleDeviceMotion, true);
  },

  handleDeviceOrientation: function (event) {
    // https://developer.mozilla.org/en-US/docs/Web/API/Window/deviceorientation_event

    //reads current orientation, not change, so just replacing rotation
    mapRot.set(event.beta, event.gamma, event.alpha);
  },

  handleDeviceMotion: function (event) {
    // https://developer.mozilla.org/en-US/docs/Web/API/DeviceMotionEvent

    //the motion event, on the other hand, doesn't track "current Position",
    //it tracks how much position has changed, and it's m/s^2... 
    //if getting acceleration, should i be doing some velocity calculations? nahhhhhh
    //if this isn't being mapped very reliably, might have to look at event.interval and do some shit
    
    //so if i'm getting a number in meters per second squared... do i need to take .interval to find the actual meter distance?
    //lets just log for now and see what we get
    mapPos.set(event.acceleration.x, event.acceleration.y, event.acceleration.z);

  }
});
