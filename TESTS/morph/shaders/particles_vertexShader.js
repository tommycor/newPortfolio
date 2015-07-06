var particles_vertexShader = [

		'attribute float pSize;',
		'attribute float pPos;',

		'uniform float size;',
		'uniform float scale;',

		'void main() {',

		'   vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );',

		'   gl_PointSize = 2.0 * pSize * size * ( scale / length( mvPosition.xyz ) );',

		'	gl_Position = projectionMatrix * mvPosition;',

		'}'


].join('\n');

