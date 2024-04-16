import "./gl-matrix.js";

const fn = ({ mat3, mat4 }) => ({
  lookAt(mvMatrix, eyePos, lookAtPos) {
    mat4.lookAt(mvMatrix, eyePos, lookAtPos, [0, 1, 0]);
  },
  
  translate(mvMatrix, position) {
    mat4.translate(mvMatrix, mvMatrix, position);
  },
  
  rotate(mvMatrix, { angle, axis }) {
    mat4.rotate(mvMatrix, mvMatrix, angle, axis);
  },
  
  scale(mvMatrix, value) {
    mat4.scale(mvMatrix, mvMatrix, value);
  },
  
  push(mvMatrix) {
  
  },
  
  pop() {
  
  },  

  mat3, mat4,
});

export default (fn)(glMatrix);