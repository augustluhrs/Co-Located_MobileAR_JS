/**
 *        *~*~**~*~*~*~*
 *      ~*~*~ CLIENT ~*~*~* 
 *        *~*~*~*~*~*~*~
 */

//
// SOCKET STUFF
//

//open and connect the input socket
let socket = io('/');

//listen for the confirmation of connection 
socket.on('connect', function(){
  console.log('now connected to server');
});

//
// THREE STUFF
//

// based on 

import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

