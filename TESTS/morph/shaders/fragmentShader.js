var fragmentShader = [
	'    varying float displacement;',

    '    void main() {',

    '        float color = smoothstep( -80.0, 200.0, displacement);',

    '        float r = 1.0 - smoothstep(0.0, 255.0, 40.0 * color);',
    '        float v = 1.0 - smoothstep(0.0, 255.0, 100.0 * color);',
    '        float b = 1.0 - smoothstep(0.0, 255.0, 230.0 * color);',

    '        gl_FragColor = vec4(r, v, b, 1);',
    '        // gl_FragColor = vec4(1, 1, 1, 1);',

    '    }'
].join('\n');