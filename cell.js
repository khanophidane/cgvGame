import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js';
import {FBXLoader} from 'https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/FBXLoader.js';


class cell {
  constructor(params) {
    this._Init(params);
  }

  _Init(params) {
    this._params = params;
 

    this._LoadModels();
  }
  _LoadModels(){

    const loader = new FBXLoader();
    loader.setPath('./resources/playarea/');
    loader.load( 'playArea.fbx', ( cell ) =>{
		
	cell.scale.setScalar(0.1);
    this._mixer = new THREE.AnimationMixer( cell );
    this._action = this._mixer.clipAction( cell.animations[ 3 ] );
	//this._action.play();
    cell.traverse( function ( child ) {

        if ( child.isMesh ) {

          child.castShadow = true;
          child.receiveShadow = true;

        }

      } );

      this._params.scene.add( cell );

    } );
  }

};
export{cell};