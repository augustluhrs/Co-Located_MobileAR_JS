AFRAME.registerComponent('show-camera', {
  init: function() {
    let hud = document.querySelector("#HUD");
    
    // Create a text element to attach to HUD
    var textPos = document.createElement("a-entity");
    textPos.setAttribute("id", "textPos");
    textPos.setAttribute("position", "0 -0.05 0.01");
    textPos.setAttribute("rotation", "0 0 0");
    textPos.setAttribute("scale", "0.5 0.5 0.5");
    textPos.setAttribute("text", {
      value: "Position: ",
      align: "center",
      color: "black",
      shader: "msdf",
    });
    hud.appendChild(textPos);
     
    var textRot = document.createElement("a-entity");
    textRot.setAttribute("id", "textRot");
    textRot.setAttribute("position", "0 0.05 0.01");
    textRot.setAttribute("rotation", "0 0 0");
    textRot.setAttribute("scale", "0.5 0.5 0.5");
    textRot.setAttribute("text", {
      value: "Rotation: ",
      align: "center",
      color: "black",
      shader: "msdf",
    });
    hud.appendChild(textRot);
    // hud.count = 0;
    
    this.pos = new THREE.Vector3();
    this.rot = new THREE.Quaternion();
  },

  tick: function () {
    // this.el.object3D.getWorldPosition(this.pos);
    // this.el.object3D.getWorldQuaternion(this.rot);

    this.pos = mapPos;
    this.rot = mapRot;
    
    document.querySelector("#textPos").setAttribute("text", { value: "Position: x:" + this.pos.x.toFixed(2) + " y: " + this.pos.y.toFixed(2) + " z: " + this.pos.z.toFixed(2)});
    document.querySelector("#textRot").setAttribute("text", { value: "Rotation: x:" + this.rot.x.toFixed(2) + " y: " + this.rot.y.toFixed(2) + " z: " + this.rot.z.toFixed(2)});
  }
});
