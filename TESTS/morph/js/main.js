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
    this.step1 = 0.01;
    this.step2 = 0.01;

    this.init();
};

draw.prototype.init = function(){

    this.container = document.getElementById('exp');
    // this.container = document;

    //// INIT
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 5000);

    ////RENDERER
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setClearColor(0x000000, 1.0);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.shadowMapEnabled = true;

    // position and point the camera to the center of the scene
    this.camera.position.x = 500;
    this.camera.position.y = 40;
    this.camera.position.z = 1000;
    this.camera.lookAt( this.scene.position );

    this.orbit = new THREE.OrbitControls(this.camera, this.renderer.domElement);

    // add spotlight for the shadows
    this.spotLight = new THREE.SpotLight(0xffffff);
    this.spotLight.position.set(10, 20, 20);
    this.spotLight.shadowCameraNear = 20;
    this.spotLight.shadowCameraFar = 50;
    this.spotLight.castShadow = true;
    this.scene.add( this.spotLight );

    this.light = new THREE.AmbientLight( 0xffffff );
    this.scene.add( this.light );

    this.geometry = this.loadModel("model/tree_morphed.json");

    this.container.appendChild(this.renderer.domElement);

    this.addControlGui();

    this.addStatsObject();

    console.log("Initialazing!");
};

draw.prototype.render = function() {
    this.orbit.update();

    this.stats.update();
    this.renderer.render(this.scene, this.camera);

    this.uniforms.time.value ++;

    if ( this.mouseout === true ){
        this.uniforms.mouse.value.x -= this.reduceSpeed;
        this.uniforms.mouse.value.y -= this.reduceSpeed;
        this.uniforms.mouse.value.z -= this.reduceSpeed;
    }

    requestAnimationFrame(this.render);
};

draw.prototype.update = function(event) {
    var mouse = getPosition(event, this.mesh, this.camera);

    if (typeof mouse !== 'undefined') {
        mouse.y += 400;
        this.uniforms.mouse.value = new THREE.Vector3( mouse.x, mouse.y, mouse.z );
        this.mouseout = false;
    }
    else {
        this.mouseout = true;
    }
};

draw.prototype.consoleBitch = function(event) {

    // this.mesh.scale.set(100,100,100);
    // console.log(this.mesh)

    console.log(this.mesh.morphTargetInfluences[0]);
    console.log(this.mesh);

};



draw.prototype.addControlGui = function(controlObject) {

    var _this = this;

    this.control = new function () {
        this.mt_0 = 0.01;
        this.mt_1 = 0.01;
    };

    var gui = new dat.GUI();

    gui.add(this.control, 'mt_0', 0, 1).step(0.01).listen().onChange(function (a) {
        _this.mesh.morphTargetInfluences[0] = a;
    });
    gui.add(this.control, 'mt_1', 0, 1).step(0.01).listen().onChange(function (a) {
        _this.mesh.morphTargetInfluences[1] = a;
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
            value: new THREE.Vector3( 0, 0, 0 )
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
        vertexShader: vertexShader,
        fragmentShader: fragmentShader
    });



    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.name = "Tree";
    this.mesh.position.y = -400;

    this.scene.add(this.mesh);

    window.addEventListener('mousemove', this.update, false);

    this.render();
};