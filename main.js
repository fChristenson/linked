(() => {
  const scene  = new THREE.Scene();
  const camera = Camera(window, THREE);

  const renderer = rendering.Renderer(window, THREE);
  document.getElementById("canvas").appendChild( renderer.domElement );

  const spheres = utils.placeSpheresRandomly(THREE, data);

  spheres
  .filter(utils.isHidden)
  .forEach(utils.makeAddToSceneFn(scene));

  const props = {camera, scene, spheres, renderer, THREE};
  initControls(window, props);
  initSphereHover(window, props)

  const render = rendering.makeRenderFn(scene, camera, renderer);
  render();

})();