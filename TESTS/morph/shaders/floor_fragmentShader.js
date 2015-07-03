var floor_fragmentShader = [

    '    varying vec2 vUv;',

    '    void main() {',

    // '        float color = 1.0 - vUv.y;',
    '        float color = ( vUv.y * 0.75 ) - 0.05;',

    '        gl_FragColor = vec4( color, color, color, 1. );',

    '    }'
].join('\n');