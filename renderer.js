const rendering = (() => {
  const Renderer = (window, THREE) => {
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight - 50);
    return renderer;
  }

  const makeRenderFn = (scene, camera, renderer) => {
    var render = function() {
      requestAnimationFrame(render);
      renderer.render(scene, camera);
    }
    return render;
  };

  return {
    Renderer: Renderer,
    makeRenderFn: makeRenderFn
  };
})();