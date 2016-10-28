const utils = (() => {
  const MAX_DISTANCE = 1000;

  const realPos = (axle, dimension) => (axle / dimension) * 2 - 1;

  const mouseX = (axle, dimension) => realPos(axle, dimension);

  const mouseY = (axle, dimension) => -realPos(axle, dimension);

  const updateMousePos = ({mouse, renderer, clientX, clientY}) => {
    mouse.x = mouseX(clientX, _.get(renderer, 'domElement.clientWidth'));
    mouse.y = mouseY(clientY, _.get(renderer, 'domElement.clientHeight'));
    return mouse;
  };

  const makeIsOverSphereFn = (props, fn) => {
    const {mouse, raycaster, renderer, spheres, camera} = props;

    return ({clientX, clientY}) => {
      updateMousePos({mouse, renderer, clientX, clientY})
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(spheres)
      
      if(_.get(intersects, 'length') > 0) {
        const name = _.get(intersects, '[0].object.data.name');
        fn(name);
      }
    };
  };

  const makeAddToSceneFn = (scene) => (item) => scene.add(item);

  const isEmpty = (val) => val === undefined || val === '' || val === null;

  const randomCoordiante = () => 
  Math.floor(Math.random() * MAX_DISTANCE * 2 + 1) - MAX_DISTANCE;

  const hasPos = (obj, axle) => _.has(obj, 'position.' + axle);

  const moveToRandomPosition = (obj) => {
    if(hasPos(obj, 'x') && hasPos(obj, 'y') && hasPos(obj, 'z')) {
      obj.position.x += randomCoordiante();
      obj.position.y += randomCoordiante();
      obj.position.z += randomCoordiante();
    }
    return obj;
  };

  const randomNumber = (max) => Math.floor(Math.random() * max);

  const dataToName = (obj) => {
    if(_.isObject(obj)) {
      return obj['First Name'] + ' ' + obj['Last Name'];
    }
    return '';
  };

  const makeDataToSphereFn = (THREE) => 
  (obj) => Sphere(THREE, dataToName(obj), _.get(obj, 'Title'));

  const placeSpheresRandomly = (THREE, data = []) => {
    return data
    .map(makeDataToSphereFn(THREE))
    .map(moveToRandomPosition)
  };

  const isHidden = (obj) => {
    return _.get(obj, 'data.isHidden') === false;
  };

  const nameToLinkedInLink = (name) => {
    if(_.isString(name)) {
      const linkName = name.toLowerCase().split(' ').join('');
      return `https://se.linkedin.com/in/${linkName}`;
    }
    return '';
  };

  return {
    placeSpheresRandomly: placeSpheresRandomly,
    makeAddToSceneFn:     makeAddToSceneFn,
    isHidden:             isHidden,
    isEmpty:              isEmpty,
    nameToLinkedInLink:   nameToLinkedInLink,
    hasPos:               hasPos,
    makeIsOverSphereFn:   makeIsOverSphereFn
  };
})();
