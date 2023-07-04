//
// DISTANCE CALCULATION
//

AFRAME.registerComponent('display-distance', {
  init: function () {
    // Get the marker element
    var marker = this.el;

    // Get the camera element
    var camera = document.querySelector("[camera]");

    // Create a text element to display the distance
    var text = document.createElement("a-entity");
    text.setAttribute("position", "0 0 0.55");
    text.setAttribute("rotation", "270 0 0");
    text.setAttribute("text", {
      value: "Distance: ",
      align: "center",
      color: "black",
      shader: "msdf",
    });
    marker.appendChild(text);

    // Update the distance on each frame
    marker.addEventListener("markerFound", ()=>{
      requestAnimationFrame(function distanceLoop() {
        if (marker.isFound){
          var distance = marker.object3D.position.distanceTo(camera.object3D.position);
          text.setAttribute("text", { value: "Distance: " + distance.toFixed(2) });
          // console.log(distance);
          requestAnimationFrame(distanceLoop);
        }
      });
    });
  },
});
