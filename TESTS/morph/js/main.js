window.onload = function() {
	var abtract = new draw();

	window.addEventListener('click', abtract.consoleBitch, false);

	window.addEventListener('resize', abtract.handleResize, false);


	// requestAnimationFrame(abtract.render);
};

var draw = function() {

	this.render = this.render.bind(this);
	this.handleResize = this.handleResize.bind(this);
	this.update = this.update.bind(this);
	this.consoleBitch = this.consoleBitch.bind(this);
	this.loadModel = this.loadModel.bind(this);
	this.plop = this.plop.bind(this);

	this.mouseout = false;
	this.reduceSpeed = 7;

	this.nbrParticles = 400;


	this.planeMeasurement = {
		width : 1.8 * Math.pow(10, 4),
		depth : 1 * Math.pow(10, 4),
		maxHeight : 300,
		subDiv : 30
	}
	this.mountainMeasurement = {
		width : 2.5 * Math.pow(10, 4),
		depth : 5 * Math.pow(10, 3),
		maxHeight : 2500,
		subDiv : 10
	}

	this.skyMeasurement = {
		width : 3 * Math.pow(10, 4),
		depth : 1 * Math.pow(10, 4),
		maxHeight : 2500,
		texture : 'model/skyNight_2.jpg',
		subDiv : 4
	}

	this.lookAtPosition = new THREE.Vector3(0, 100, 0);

	this.init();
};

draw.prototype.init = function(){

	this.container = document.getElementById('exp');
	// this.container = document;

	//// INIT
	this.scene = new THREE.Scene();
	this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 20000);
	// this.camera = new THREE.OrthographicCamera(window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, 1, 10000);

	////RENDERER
	this.renderer = new THREE.WebGLRenderer();
	this.renderer.setClearColor(0xffffff, 1.0);
	this.renderer.setSize(window.innerWidth, window.innerHeight);
	this.renderer.shadowMapEnabled = true;

	// position and point the camera to the center of the scene
	this.camera.position.x = 0;
	this.camera.position.y = -140;
	this.camera.position.z = 2300;
	this.camera.lookAt( this.lookAtPosition );

	// this.orbit = new THREE.OrbitControls(this.camera, this.renderer.domElement);

	// add spotlight for the shadows
	// this.spotLight = new THREE.SpotLight(0xffffff, 10);
	// this.spotLight.distance = 20000;
	// this.spotLight.exponent = 0.1;
	// this.spotLight.angle = Math.PI/4;
	// this.spotLight.onlyShadow = true;
	// this.spotLight.position.set(0, 0, 3000);
	// this.spotLight.castShadow = true;
	// this.spotLight.shadowCameraNear = 50;
	// this.spotLight.shadowCameraFar = 1000;
	// this.spotLight.shadowDarkness = 1;
	// this.spotLight.target.position.set( 0, -2000, -10000 );
	// this.spotLight.target.updateMatrixWorld();
	// this.scene.add( this.spotLight );
	// this.scene.add( this.spotLight.target );

	// this.directionalLight = new THREE.DirectionalLight( 0xffffff, 5 );
	// this.directionalLight.castShadow = true;
	// this.directionalLight.position.set(0, 0, 2000);
	// this.directionalLight.target.position.set( 0, -1000, -15000 );
	// this.directionalLight.target.updateMatrixWorld();
	// this.directionalLight.shadowCameraNear = 500;
	// this.directionalLight.shadowCameraFar = 10000;
	// this.scene.add( this.directionalLight );
	// this.scene.add( this.directionalLight.target );

	this.receptorGeometry = new THREE.PlaneGeometry(3000, 3000);
	this.receptorMaterial = new THREE.MeshBasicMaterial({ 
		visible : false
		// color: 'grey',
		// transparent: true,
		// opacity: 0.5
	})
	this.receptor = new THREE.Mesh(this.receptorGeometry, this.receptorMaterial);
	this.receptor.y = -100;
	this.receptor.name = 'receptor';
	this.scene.add(this.receptor);

	this.ambient = new THREE.AmbientLight( 0xffffff );
	this.scene.add(this.ambient);

	this.createPlane();

	this.createSky();

	this.createParticles();

	this.geometry = this.loadModel("model/tree_morphed.json");

	this.container.appendChild(this.renderer.domElement);

	this.addControlGui();

	this.addStatsObject();

	console.log("Initialazing!");
};

draw.prototype.render = function() {
	// this.orbit.update();

	this.stats.update();
	this.renderer.render(this.scene, this.camera);

	this.uniforms.time.value ++;
	this.particlesUniforms['time'].value ++;

	if ( this.mouseout === true ){
		this.uniforms.mouse.value.x -= this.reduceSpeed;
		this.uniforms.mouse.value.y -= this.reduceSpeed;
		this.uniforms.mouse.value.z -= this.reduceSpeed;
	}

	TWEEN.update();

	requestAnimationFrame(this.render);
};

draw.prototype.update = function(event) {
	var mouse = getPosition2D(event, this.receptor, this.camera);

	if (typeof mouse !== 'undefined') {
		mouse.y += 400;
		this.uniforms.mouse.value = new THREE.Vector3( mouse.x, mouse.y, mouse.z );
		this.mouseout = false;
	}
	else {
		this.mouseout = true;
	}
};



draw.prototype.addControlGui = function(controlObject) {

	var _this = this;

	this.control = new function () {
		this.mt_0 = 0.7;
		this.mt_1 = 0.7;
		this.X = 0;
		this.Y = -140;
		this.Z = 2300;
	};

	var gui = new dat.GUI();

	gui.add(this.control, 'mt_0', 0, 1).step(0.01).listen().onChange(function (a) {
		_this.mesh.morphTargetInfluences[0] = a;
	});
	gui.add(this.control, 'mt_1', 0, 1).step(0.01).listen().onChange(function (a) {
		_this.mesh.morphTargetInfluences[1] = a;
	});
	gui.add(this.control, 'X', -200, 200).step(10).listen().onChange(function (a) {
		_this.camera.position.x = a;
		_this.camera.lookAt( _this.lookAtPosition );
	});
	gui.add(this.control, 'Y', -3000, 10000).step(10).listen().onChange(function (a) {
		_this.camera.position.y = a;
		_this.camera.lookAt( _this.lookAtPosition );
	});
	gui.add(this.control, 'Z', -3000, 10000).step(10).listen().onChange(function (a) {
		_this.camera.position.z = a;
		_this.camera.lookAt( _this.lookAtPosition );
	});
};

draw.prototype.addStatsObject = function() {
	this.stats = new Stats();
	this.stats.setMode(0);

	this.stats.domElement.style.position = 'absolute';
	this.stats.domElement.style.left = '0px';
	this.stats.domElement.style.top = '0px';

	document.body.appendChild(this.stats.domElement);
};

draw.prototype.handleResize = function() {
	this.camera.aspect = window.innerWidth / window.innerHeight;
	this.camera.updateProjectionMatrix();
	this.renderer.setSize(window.innerWidth, window.innerHeight);
};

draw.prototype.loadModel = function(url) {
	this.loader = new THREE.JSONLoader();
	this.loader.load( url, this.plop);
};


draw.prototype.plop = function(geometry) {

	this.geometry = geometry;

	this.uniforms = {
		mouse: {
			type: 'v3',
			value: new THREE.Vector3( -3000, -3000, -3000 )
		},
		time: {
			type: 'f',
			value: 0.0
		}
	};

	this.material = new THREE.ShaderMaterial( {
		wireframe: true,
		uniforms: this.uniforms,
		morphTargets: true,
		vertexShader: tree_vertexShader,
		fragmentShader: tree_fragmentShader
	});


	this.mesh = new THREE.Mesh(this.geometry, this.material);
	this.mesh.name = "Tree";
	this.mesh.morphTargetInfluences[0] = 0.4;
	this.mesh.morphTargetInfluences[1] = 0.7;
	this.mesh.position.y = -400;
	this.camera.updateProjectionMatrix();
	this.mesh.updateMatrixWorld();
	this.mesh.updateMatrix();
	this.mesh.rotationAutoUpdate = true;
	this.mesh.castShadow = true;
	this.scene.add(this.mesh);

	this.animIntro();

	window.addEventListener('mousemove', this.update, false);

	this.render();
};

draw.prototype.animIntro = function() {

	var _this = this;

	var start = {
		Influence0 : _this.mesh.morphTargetInfluences[0],
		Influence1 : _this.mesh.morphTargetInfluences[1]
	}
	var end = {
		Influence0 : 0,
		Influence1 : 0
	}

	var tween1 = new TWEEN.Tween(start)
			.to(end, 5000)
			.onUpdate(function(){
				_this.mesh.morphTargetInfluences[0] = this.Influence0;
				_this.mesh.morphTargetInfluences[1] = this.Influence1;
			})
			.easing(TWEEN.Easing.Quadratic.InOut)
			.start();

}

draw.prototype.createPlane = function() {


	this.planeGeometry = new THREE.PlaneGeometry( this.planeMeasurement.width, this.planeMeasurement.depth, this.planeMeasurement.subDiv, this.planeMeasurement.subDiv );
	for (i = 0; i < this.planeGeometry.vertices.length ; i++){
		this.planeGeometry.vertices[i].x += Math.random() * 100 - 50;
		this.planeGeometry.vertices[i].y += Math.random() * 100 - 50;
		this.planeGeometry.vertices[i].z += Math.random() * this.planeMeasurement.maxHeight - ( this.planeMeasurement.maxHeight / 2 );
	}
	this.planeGeometry.verticesNeedUpdate = true;
	this.planeMaterial = new THREE.ShaderMaterial( {
		vertexShader: floor_vertexShader,
		fragmentShader: floor_fragmentShader
	});
	this.plane = new THREE.Mesh(this.planeGeometry, this.planeMaterial);
	this.plane.name = "plane";
	this.plane.receiveShadow = true;
	this.plane.castShadow = true;
	this.plane.position.y = -650;
	this.plane.rotation.x = -Math.PI/2;
	this.plane.position.z = - this.planeMeasurement.depth / 2 + 1400;
	this.scene.add(this.plane);

	this.edges = new THREE.EdgesHelper( this.plane, 0xbe8b40 );
	// this.scene.add(this.edges);


	this.mountainGeometry = new THREE.PlaneGeometry( this.mountainMeasurement.width, this.mountainMeasurement.depth, this.mountainMeasurement.subDiv, this.mountainMeasurement.subDiv );
	for (i = 0; i < this.mountainGeometry.vertices.length ; i++){
		this.mountainGeometry.vertices[i].x += Math.random() * 100 - 50;
		this.mountainGeometry.vertices[i].y += Math.random() * 100 - 50;
		this.mountainGeometry.vertices[i].z += Math.random() * this.mountainMeasurement.maxHeight;

		if ( this.mountainGeometry.vertices[i].y <= 1000){
			this.mountainGeometry.vertices[i].z = -800;
		}
	}

	this.mountainGeometry.verticesNeedUpdate = true;
	// this.mountainMaterial = new THREE.MeshLambertMaterial({
		// color: 0x606060,
		// side: THREE.DoubleSide
	// });
	this.mountainMaterial = new THREE.ShaderMaterial( {
		vertexShader: mountain_vertexShader,
		fragmentShader: mountain_fragmentShader
	});

	this.mountain = new THREE.Mesh(this.mountainGeometry, this.mountainMaterial)
	this.mountain.name = "mountain";
	this.mountain.rotation.x = -Math.PI/2;
	this.mountain.position.z = -9000;
	this.scene.add(this.mountain);

	this.edgesMountain = new THREE.EdgesHelper( this.mountain, 0xbe8b40 );
	// this.scene.add(this.edgesMountain);

};

draw.prototype.createSky = function() {
	this.skyGeometry = new THREE.PlaneGeometry( this.skyMeasurement.width, this.skyMeasurement.depth, this.skyMeasurement.subDiv, this.skyMeasurement.subDiv );
	this.skyGeometry.verticesNeedUpdate = true;
	this.skyMaterial = new THREE.MeshLambertMaterial({
		// map: this.skyTexture,
		map: THREE.ImageUtils.loadTexture( this.skyMeasurement.texture ),
		side:THREE.DoubleSide
	});

	this.sky = new THREE.Mesh(this.skyGeometry, this.skyMaterial)
	this.sky.name = "sky"
	this.sky.receiveShadow = true;
	this.sky.castShadow = true;
	this.sky.position.y = 5000;
	this.sky.position.z = -13000;
	this.sky.material.needsUpdate = true;
	this.scene.add(this.sky);
};

draw.prototype.createParticles = function() {

	this.particlesGeometry = new THREE.Geometry();
	this.pSize = [];

	for (var i = 0; i < this.nbrParticles; i++) {

		var v = new THREE.Vector3();
		v.x = Math.random() * 10000;
		v.y = Math.random() * 200;
		v.z = Math.random() * 10000;

		// add the vertex
		this.particlesGeometry.vertices.push(v);

		this.pSize.push(Math.random()*50);

		// this.pSize.push(100);
		
	}


	this.particulesAttributes = {
		pSize: {type: 'f', value: this.pSize}
	};

	var basicShaderUniforms = {
		time: {type: 'f', value: 0.0},
	};

	var basicShader = THREE.ShaderLib['particle_basic'];
	this.particlesUniforms = THREE.UniformsUtils.merge([basicShader.uniforms, basicShaderUniforms]);
	this.particlesUniforms['map'].value = THREE.ImageUtils.loadTexture("model/ps_smoke_3.png");
	this.particlesUniforms['size'].value = 100;
	this.particlesUniforms['opacity'].value = 0.5;
	this.particlesUniforms['psColor'].value = new THREE.Color(0xffffff);



	this.particlcesMaterial = new THREE.ShaderMaterial({
		attributes: this.particulesAttributes,
		uniforms: this.particlesUniforms,
		transparent: true,
		blending: THREE.AdditiveBlending,
		vertexShader: particles_vertexShader,
		fragmentShader: particles_fragmentShader
	});

	this.particles = new THREE.PointCloud(this.particlesGeometry, this.particlcesMaterial);
	this.particles.position.x = -5000;
	this.particles.position.y = -550;
	this.particles.position.z = -6000;
	this.particles.sortParticles = true;

	this.scene.add(this.particles);




};


draw.prototype.consoleBitch = function(event) {
	this.sky.material.needsUpdate = true;
};