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

    this.planeMeasurement ={
        depth : 50,
        width : 100,
        margin : 200,
        height : 100
    }

    this.lookAtPosition = new THREE.Vector3(0, 100, 0);

    this.init();
};

draw.prototype.init = function(){

    this.container = document.getElementById('exp');
    // this.container = document;

    //// INIT
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 10000);

    ////RENDERER
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setClearColor(0x000000, 1.0);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.shadowMapEnabled = true;

    // position and point the camera to the center of the scene
    this.camera.position.x = 0;
    this.camera.position.y = -140;
    this.camera.position.z = 2600;
    this.camera.lookAt( this.lookAtPosition );

    console.log(this.scene.position)

    // this.orbit = new THREE.OrbitControls(this.camera, this.renderer.domElement);

    // add spotlight for the shadows
    this.spotLight = new THREE.SpotLight(0xffffff);
    this.spotLight.position.set(10, 20, 20);
    this.spotLight.shadowCameraNear = 20;
    this.spotLight.shadowCameraFar = 50;
    this.spotLight.castShadow = true;
    this.scene.add( this.spotLight );

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


    this.light = new THREE.AmbientLight( 0xffffff );
    this.scene.add( this.light );

    this.geometry = this.loadModel("model/tree_morphed_3.json");

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
    };

    var gui = new dat.GUI();

    gui.add(this.control, 'mt_0', 0, 1).step(0.01).listen().onChange(function (a) {
        _this.mesh.morphTargetInfluences[0] = a;
    });
    gui.add(this.control, 'mt_1', 0, 1).step(0.01).listen().onChange(function (a) {
        _this.mesh.morphTargetInfluences[1] = a;
    });
    gui.add(this.control, 'X', -3000, 6000).step(10).listen().onChange(function (a) {
        _this.camera.position.x = a;
        _this.camera.lookAt( _this.lookAtPosition );
    });
    gui.add(this.control, 'Y', -3000, 6000).step(10).listen().onChange(function (a) {
        _this.camera.position.y = a;
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
        vertexShader: vertexShader,
        fragmentShader: fragmentShader
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
    this.scene.add(this.mesh);

    this.plane = createPlane3D(this.planeMeasurement.depth, this.planeMeasurement.width, this.planeMeasurement.margin, this.planeMeasurement.height);
    this.plane.position.x = - ( ( this.planeMeasurement.width * this.planeMeasurement.margin ) / 2 );
    this.plane.position.y = -650;
    this.plane.position.z = - 3 * ( this.planeMeasurement.depth * this.planeMeasurement.margin ) /4;
    // this.plane.applyMatrix( new THREE.Matrix4().makeTranslation( -( this.planeMeasurement.depth * this.planeMeasurement.margin ) /2, 0, 0));
    this.scene.add(this.plane);

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


draw.prototype.consoleBitch = function(event) {

    var _this = this;

    TweenLite.to(logo, 2, {left:"542px", backgroundColor:"black", borderBottomColor:"#90e500", color:"white"});

};