var particles_vertexShader = [

		PerlinNoise,

		'attribute float pSize;',
		'attribute float pPos;',

		'uniform float size;',
		'uniform float scale;',
		'uniform float time;',

		'void main() {',

		// '   vec3 newPosition = pnoise( position + 0.005 * time, vec3( 1.0 ) );',

		'   vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );',

		'   gl_PointSize = 2.0 * pSize * size * ( scale / length( mvPosition.xyz ) );',

		'	gl_Position = projectionMatrix * mvPosition;',

		'}'


].join('\n');

