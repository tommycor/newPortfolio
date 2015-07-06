var tree_vertexShader = [

        PerlinNoise,

        '/////////////////////////////////////////////////////////// Shader',

        //THREEJS MORPHTARGET
        THREE.ShaderChunk[ "morphtarget_pars_vertex" ],


        'varying vec3 vNormal;',

        'uniform vec3 mouse;',

        'uniform float time;',

        'varying float displacement;',

        'void main() {',

        //THREEJS MORPHTARGET
        THREE.ShaderChunk[ "morphtarget_vertex" ],

        '    float upper = 400.0;',
        '    float multiplicator = 1.2;',

        '    // float upper = 1500.0;',
        '    // float multiplicator = 4.0;',

        '    vNormal = normal;',

        '    vec3 fakePosition = position * vec3(1, 1, 0);',

        '    float distance = distance(mouse, fakePosition);',

        '    if (distance > ( upper / multiplicator ) ) {',
        '      // mouseout',

        '        displacement = 15.0 * pnoise( 0.05 * position + 0.005 * time, vec3( 1.0 ) ) ;',
        '    }',
        '    else {',
        '      //mousein',

        '        displacement = ( -( distance * multiplicator ) + upper ) * pnoise( 0.05 * position + 0.01 * time, vec3( 100.0 ) ) ;',
        '        // displacement = ( ( distance * 0.5 ) ) * pnoise( 0.05 * position + 0.01 * time, vec3( 100.0 ) ) ;',
        '        // displacement = bosse * noise',
        '    }              ',

        '    // displacement = ( -( distance ) + upper ) * pnoise( 0.05 * position, vec3( 1.0 ) ) ;',
        '    // displacement = ( -( distance )  ) ;',

        '    if (displacement <= 0.0) {',
        '        displacement = 0.0;',
        '    }',

        //morphed is the variable provided by THREEJS with the ShaderChunk[ "morphtarget_vertex" ]
        '    vec3 newPosition = morphed + normal * vec3(displacement);',

        '    gl_Position = projectionMatrix * modelViewMatrix * vec4( newPosition, 1.0 );',

        '}'


].join('\n');

