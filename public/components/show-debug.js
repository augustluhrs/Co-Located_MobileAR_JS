AFRAME.registerComponent('show-debug', {
  init: function () {
    
    var self = this.el
    let pos = new THREE.Vector3();
    let rot = new THREE.Quaternion();

    var textPos = document.createElement("a-entity");
    textPos.setAttribute("position", "-0.5 0 -0.5");
    textPos.setAttribute("rotation", "270 0 0");
    textPos.setAttribute("text", {
      value: "Position: ",
      align: "center",
      color: "black",
      shader: "msdf",
    });
    self.appendChild(textPos);
    
    var textRot = document.createElement("a-entity");
    textRot.setAttribute("position", "0.5 0 -0.5");
    textRot.setAttribute("rotation", "270 0 0");
    textRot.setAttribute("text", {
      value: "Rotation: ",
      align: "center",
      color: "black",
      shader: "msdf",
    });
    self.appendChild(textRot);


    self.addEventListener("markerFound", ()=>{
      requestAnimationFrame(function debugLoop() {
        // if (self.object3D.visible = true){ //idk why this was causing a marker-lost loop....
        if (self.isFound){ 
          self.object3D.getWorldPosition(pos);
          self.object3D.getWorldQuaternion(rot);
          textPos.setAttribute("text", { value: "Position: x:" + pos.x.toFixed(2) + " y: " + pos.y.toFixed(2) + " z: " + pos.z.toFixed(2)});
          textRot.setAttribute("text", { value: "Rotation: x:" + rot.x.toFixed(2) + " y: " + rot.y.toFixed(2) + " z: " + rot.z.toFixed(2)});
          // textPos.setAttribute("text", { value: "Position: x:" + self.object3D.position.x.toFixed(2) + " y: " + self.object3D.position.y.toFixed(2) + " z: " + self.object3D.position.z.toFixed(2)});
          // textRot.setAttribute("text", { value: "Rotation: x:" + self.object3D.rotation.x.toFixed(2) + " y: " + self.object3D.rotation.y.toFixed(2) + " z: " + self.object3D.rotation.z.toFixed(2)});
          requestAnimationFrame(debugLoop);
        }
      });
    });
  },
});
