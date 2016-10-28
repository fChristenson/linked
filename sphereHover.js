const initSphereHover = (window, props) => {
  const {THREE} = props;
  const showName = () => console.log('foo');

  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();
  const copy = Object.assign({raycaster, mouse}, props);
  window.addEventListener('mousemove', utils.makeIsOverSphereFn(copy, showName))
};
