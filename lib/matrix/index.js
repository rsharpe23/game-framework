import "./gl-matrix.js";

const fn = ({ mat3, mat4 }) => ({
  lookAt(mvMatrix, eye, point) {
    mat4.lookAt(mvMatrix, eye, point, [0, 1, 0]);
  },
  
  translate(mvMatrix, position) {
    mat4.translate(mvMatrix, mvMatrix, position);
  },
  
  rotate(mvMatrix, [x, y, z, w]) {
    mat4.rotate(mvMatrix, mvMatrix, w, [x, y, z]);
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