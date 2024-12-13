import { shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';

// GLSL Noise implementation
const noiseFunction = `
  //
  // GLSL textureless classic 2D noise "cnoise",
  // with an RSL-style periodic variant "pnoise".
  // Author:  Stefan Gustavson (stefan.gustavson@liu.se)
  // Version: 2011-08-22
  //
  // Many thanks to Ian McEwan of Ashima Arts for the
  // ideas for permutation and gradient selection.
  //
  // Copyright (c) 2011 Stefan Gustavson. All rights reserved.
  // Distributed under the MIT license.
  //

  vec4 permute(vec4 x) {
    return mod(((x*34.0)+1.0)*x, 289.0);
  }

  vec2 fade(vec2 t) {
    return t*t*t*(t*(t*6.0-15.0)+10.0);
  }

  float cnoise(vec2 P) {
    vec4 Pi = floor(P.xyxy) + vec4(0.0, 0.0, 1.0, 1.0);
    vec4 Pf = fract(P.xyxy) - vec4(0.0, 0.0, 1.0, 1.0);
    Pi = mod(Pi, 289.0);
    vec4 ix = Pi.xzxz;
    vec4 iy = Pi.yyww;
    vec4 fx = Pf.xzxz;
    vec4 fy = Pf.yyww;
    vec4 i = permute(permute(ix) + iy);
    vec4 gx = 2.0 * fract(i * 0.0243902439) - 1.0;
    vec4 gy = abs(gx) - 0.5;
    vec4 tx = floor(gx + 0.5);
    gx = gx - tx;
    vec2 g00 = vec2(gx.x,gy.x);
    vec2 g10 = vec2(gx.y,gy.y);
    vec2 g01 = vec2(gx.z,gy.z);
    vec2 g11 = vec2(gx.w,gy.w);
    vec4 norm = 1.79284291400159 - 0.85373472095314 * vec4(dot(g00,g00), dot(g01,g01), dot(g10,g10), dot(g11,g11));
    g00 *= norm.x;
    g01 *= norm.y;
    g10 *= norm.z;
    g11 *= norm.w;
    float n00 = dot(g00, vec2(fx.x, fy.x));
    float n10 = dot(g10, vec2(fx.y, fy.y));
    float n01 = dot(g01, vec2(fx.z, fy.z));
    float n11 = dot(g11, vec2(fx.w, fy.w));
    vec2 fade_xy = fade(Pf.xy);
    vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x);
    float n_xy = mix(n_x.x, n_x.y, fade_xy.y);
    return 2.3 * n_xy;
  }
`;

export const TerrainMaterial = shaderMaterial(
  {
    time: 0,
    colorMap: null,
  },
  // Vertex shader
  `
    uniform float time;
    varying vec2 vUv;
    varying float vElevation;
    
    ${noiseFunction}
    
    void main() {
      vUv = uv;
      vec3 pos = position;
      
      float elevation = cnoise(pos.xz * 0.1) * 0.5;
      pos.y += elevation;
      vElevation = elevation;
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  // Fragment shader
  `
    uniform float time;
    varying vec2 vUv;
    varying float vElevation;
    
    void main() {
      vec3 baseColor = vec3(0.1, 0.18, 0.1);
      vec3 highlightColor = vec3(0.25, 0.35, 0.25);
      
      float heightFactor = smoothstep(-0.5, 0.5, vElevation);
      vec3 finalColor = mix(baseColor, highlightColor, heightFactor);
      
      gl_FragColor = vec4(finalColor, 1.0);
    }
  `
);