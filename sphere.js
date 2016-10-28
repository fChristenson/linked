const Sphere = (THREE, name, title) => {
  var geometry = new THREE.SphereGeometry( 1, 15, 15 );
  var material = new THREE.MeshBasicMaterial( {color: 0xf7ee40} );
  const result = new THREE.Mesh( geometry, material );
  result.data = {
    name: name,
    title: title,
    isHidden: false
  };
  return result;
};
