AFRAME.registerComponent('show-camera', {
  init: function() {
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
    document.querySelector("#HUD").appendChild(textPos);
    
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
    document.querySelector("#HUD").appendChild(textRot);
  },

  tick: function () {
    var pos = new THREE.Vector3();
    var rot = new THREE.Quaternion();
    let hud = document.querySelector("#HUD");
    // return function () {
    this.el.object3D.getWorldPosition(pos);
    this.el.object3D.getWorldQuaternion(rot);
    document.querySelector("#textPos").setAttribute("text", { value: "Position: x:" + pos.x.toFixed(2) + " y: " + pos.y.toFixed(2) + " z: " + pos.z.toFixed(2)});
    document.querySelector("#textRot").setAttribute("text", { value: "Rotation: x:" + rot.x.toFixed(2) + " y: " + rot.y.toFixed(2) + " z: " + rot.z.toFixed(2)});
    // };
    
  }
});
