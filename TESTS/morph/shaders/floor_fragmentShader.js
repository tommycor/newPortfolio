var floor_fragmentShader = [

    '    varying vec2 vUv;',

    '    void main() {',

    '        float color = 1.0 - vUv.y;',

    '        gl_FragColor = vec4( color, color, color, 1. );',

    '    }'
].join('\n');