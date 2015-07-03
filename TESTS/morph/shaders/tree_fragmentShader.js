var tree_fragmentShader = [
	'    varying float displacement;',

    '    void main() {',

    '        float color = smoothstep( 0.0, 130.0, displacement);',

    // '        float r = 1.0 - smoothstep(0.0, 255.0, 40.0 * color);',
    // '        float v = 1.0 - smoothstep(0.0, 255.0, 100.0 * color);',
    // '        float b = 1.0 - smoothstep(0.0, 255.0, 230.0 * color);',
    '        float r = smoothstep(0.0, 255.0, 215.0 * color);',
    '        float v = smoothstep(0.0, 255.0, 155.0 * color);',
    '        float b = smoothstep(0.0, 255.0, 25.0 * color);',

    '        gl_FragColor = vec4(r, v, b, 1);',
    '        // gl_FragColor = vec4(1, 1, 1, 1);',

    '    }'
].join('\n');