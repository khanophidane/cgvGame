import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js';
import {FBXLoader} from 'https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/FBXLoader.js';


class cellmate {
  constructor(params) {
    this._Init(params);
  }

  _Init(params) {
    this._params = params;
    this._decceleration = new THREE.Vector3(-0.0005, -0.0001, -5.0);
    this._acceleration = new THREE.Vector3(1, 0.25, 50.0);
    this._velocity = new THREE.Vector3(0, 0, 0);
    this._position = new THREE.Vector3(-30,0,-45);

    this._LoadModels();
   // this._position=this.position;
  }
  _LoadModels(){

    const loader = new FBXLoader();
    loader.setPath('./resources/cellmate');
    loader.load( '/cellMate.fbx', ( cellmate ) =>{
      cellmate.scale.setScalar(0.1);
      cellmate.position.set(-30,0,-30)
      this._mixer = new THREE.AnimationMixer( cellmate );

      this._dying = this._mixer.clipAction( cellmate.animations[ 1 ] );
      this._punch = this._mixer.clipAction( cellmate.animations[ 2 ] );
      this._punched = this._mixer.clipAction( cellmate.animations[ 3 ] );
      this._walk = this._mixer.clipAction( cellmate.animations[ 6 ] );
      this._punched.play();

      cellmate.traverse( function ( child ) {

        if ( child.isMesh ) {

          child.castShadow = true;
          child.receiveShadow = true;

        }

      } );

      this._params.scene.add( cellmate );

    } );
  }

};
export{cellmate};