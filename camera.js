const Camera = (window, THREE) => {
  const CUT_OFF_DISTANCE = 10000;

  const camera = new THREE.PerspectiveCamera(
    45, 
    window.innerWidth / window.innerHeight, 
    0.1, 
    CUT_OFF_DISTANCE
  );

  camera.position.z = 500;
  return camera;
};
