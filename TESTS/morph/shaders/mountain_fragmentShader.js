var mountain_fragmentShader = [

    '    varying vec2 vUv;',

    '    void main() {',

    '        float color = 0.85 - vUv.y;',

    '        gl_FragColor = vec4( color, color, color, 1. );',

    '    }'
].join('\n');