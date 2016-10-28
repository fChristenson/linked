const initControls = (window, props) => {
  const {camera, spheres, scene, THREE} = props;

  const moveForward = (isShiftKey, camera, stepSize) => {
    if(isShiftKey) {
      tiltUp(camera, stepSize);
    }
    else {
      goForward(camera, stepSize);
    }
  };

  const moveBack = (isShiftKey, camera, stepSize) => {
    if(isShiftKey) {
      tiltDown(camera, stepSize);
    }
    else {
      goBack(camera, stepSize);
    }
  };

  const moveLeft = (isShiftKey, camera, stepSize) => {
    if(isShiftKey) {
      rotateLeft(camera, stepSize);
    }
    else {
      goLeft(camera, stepSize);
    }
  };

  const moveRight = (isShiftKey, camera, stepSize) => {
    if(isShiftKey) {
      rotateRight(camera, stepSize);
    }
    else {
      goRight(camera, stepSize);
    }
  };

  const incPos = (camera, axle, stepSize) => {
    if(utils.hasPos(camera, axle)) {
      camera.position[axle] += stepSize;
    }
  }

  const decPos = (camera, axle, stepSize) => {
    if(utils.hasPos(camera, axle)) {
      camera.position[axle] -= stepSize;
    }
  }

  const goUp = (camera, stepSize) => decPos(camera, 'y', stepSize);

  const goDown = (camera, stepSize) => incPos(camera, 'y', stepSize);

  const goLeft = (camera, stepSize) => decPos(camera, 'x', stepSize);;

  const goRight = (camera, stepSize) => incPos(camera, 'x', stepSize);;

  const goForward = (camera, stepSize) => decPos(camera, 'z', stepSize);;

  const goBack = (camera, stepSize) => incPos(camera, 'z', stepSize);;

  const rotateLeft = (camera, stepSize) => {
    console.log('rotate left');
  };

  const rotateRight = (camera, stepSize) => {
    console.log('rotate right');
  };

  const tiltUp = (camera, stepSize) => {
    console.log('tilt up');
  };

  const tiltDown = (camera, stepSize) => {
    console.log('tilt down');
  };

  const moveCamera = (camera) => ({keyCode, shiftKey}) => {
    const stepSize = 20;
    switch(keyCode) {
      case 87:
        moveForward(shiftKey, camera, stepSize);
        break;
      case 83:
        moveBack(shiftKey, camera, stepSize);
        break;
      case 65:
        moveLeft(shiftKey, camera, stepSize);
        break;
      case 68:
        moveRight(shiftKey, camera, stepSize);
        break;
      case 81:
        goUp(camera, stepSize);
        break;
      case 69:
        goDown(camera, stepSize);
        break;
      default:
    }
  };

  const stringToStartsWith = (str) => '^' + str;

  const makeFindNameMatchesFn = (name) => {
    return (sphere) => {
      return !new RegExp(stringToStartsWith(name), 'i')
      .test(_.get(sphere, 'data.name'));
    };
  };

  const makeRemoveSphereFn = (scene) => {
    return (sphere) => {
      if(_.has(sphere, 'data.isHidden')) {
        sphere.data.isHidden = true;
        scene.remove(sphere);
      }
      return sphere;
    };
  };

  const removeSpheres = (string, scene, spheres) => {
    return spheres
    .filter(makeFindNameMatchesFn(string))
    .map(makeRemoveSphereFn(scene));
  };

  const isSearch = (id) => id === 'search';

  const filterSpheres = (spheres, scene) => (event) => {
    const id = _.get(event, 'target.id');
    const val = _.get(event, 'target.value');

    if(isSearch(id) && utils.isEmpty(val)) {
      spheres.forEach(utils.makeAddToSceneFn(scene));
    }
    else if (isSearch(id)) {
      spheres.forEach(utils.makeAddToSceneFn(scene));
      removeSpheres(val, scene, spheres); 
    }
  };

  const moveCameraOnSearch = (camera) => (event) => {
    if(!isSearch(_.get(event, 'target.id'))) {
      moveCamera(camera)(event);
    }
  };

  const openLink = (name) => {
    const url = utils.nameToLinkedInLink(name);
    window.open(url, '_blank');
  };

  window.addEventListener('keyup', filterSpheres(spheres, scene));
  window.addEventListener('keydown', moveCameraOnSearch(camera));

  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();
  const copy = Object.assign({raycaster, mouse}, props)
  window.addEventListener('mousedown', utils.makeIsOverSphereFn(copy, openLink));
};
