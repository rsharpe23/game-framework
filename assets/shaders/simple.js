export default {
  vert: `
    attribute vec4 a_Pos;
    uniform mat4 u_PMatrix;
    uniform mat4 u_MVMatrix;
    
    void main() {
      gl_Position = u_PMatrix * u_MVMatrix * a_Pos;
    }
  `,

  frag: `
    void main() {
      gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
    }
  `,
};