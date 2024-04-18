// Такой импорт создаёт побочный эффект
// в виде доступного glMatrix в других модулях
import "./gl-matrix.js"; 

const { mat4 } = glMatrix;
const matStack = [];

export default {
  push(mvMatrix) {
    const temp = mat4.create();
    mat4.copy(temp, mvMatrix);
    matStack.push(temp);
  },
  
  pop(mvMatrix) {
    if (matStack.length > 0) {
      mvMatrix.set(matStack.pop());
    }
  },  

  lookAt(mvMatrix, eye, point) {
    mat4.lookAt(mvMatrix, eye, point, [0, 1, 0]);
  },

  translate(mvMatrix, position) {
    mat4.translate(mvMatrix, mvMatrix, position);
  },
  
  rotate(mvMatrix, [x, y, z, w]) {
    mat4.rotate(mvMatrix, mvMatrix, w, [x, y, z]);
  },
  
  scale(mvMatrix, scale) {
    mat4.scale(mvMatrix, mvMatrix, scale);
  },
};