function createPlane3D(depth, width, margin, height){
	// first create all the individual vertices
	var geometry = new THREE.Geometry();
	for (var z = 0 ; z < depth ; z++) {
		for (var x = 0 ; x < width ; x++) {
			var y = Math.random()*height;
			var vertex = new THREE.Vector3(x*margin - Math.random()*margin, y,z*margin - Math.random()*margin);
			vertex.displacement = y;
			geometry.vertices.push(vertex);
		}
	}

	for (var z = 0 ; z < depth-1 ; z++) {
		for (var x = 0 ; x < width-1 ; x++) {
			//a,b,c and d are the index of the interesting vertices
			var a = x + z*width;
			var b = (x+1) + (z * width);
			var c = x + ((z+1) * width);
			var d = (x+1) + ((z+1) * width);

			var face1 = new THREE.Face3(b, a, c);
			var face2 = new THREE.Face3(c ,d, b);

			geometry.faces.push(face2);
		}
	}

    var mat = new THREE.MeshLambertMaterial({
        // wireframe: true,
        color: 'grey'
	});
    

    var plane = new THREE.Mesh(geometry,mat);
    plane.name = 'field';

    return plane;
}