var particles_fragmentShader = [


	'    uniform vec3 psColor;',
	'    uniform float opacity;',

	'    uniform sampler2D map;',


	'    void main() {',

	'        gl_FragColor = texture2D( map, vec2( gl_PointCoord.x, 1.0 - gl_PointCoord.y ) );',
	'        gl_FragColor = gl_FragColor * vec4( vec3(1., 1., 1.) , 1.0 );',
	// '        gl_FragColor = vec4( vec3(1., 1., 1.) , 1.0 );',

	'    }'

	
].join('\n');