export default gl => ({
  createProgram(vs, fs) {
    return createProgram(gl, createShader(gl, gl.VERTEX_SHADER, vs), 
      createShader(gl, gl.FRAGMENT_SHADER, fs));
  },

  createBuffer(data, itemsPerAttr) {
    const buffer = createBuffer(gl, 
      gl.ARRAY_BUFFER, new Float32Array(data));

    buffer.itemsPerAttr = itemsPerAttr;
    buffer.itemType = gl.FLOAT;

    return buffer;  
  },

  createIndexBuffer(data) {
    const buffer = createBuffer(gl, 
      gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(data));
    buffer.count = data.length;
    return buffer;
  },

  vertexAttribPointer(attr, buffer) {
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.vertexAttribPointer(attr, buffer.itemsPerAttr, 
      buffer.itemType, false, 0, 0);
  },

  drawElements({ count }) {
    gl.drawElements(gl.TRIANGLES, count, gl.UNSIGNED_SHORT, 0);
  },

  // drawElements() {
  //   const bufferSize = getBufferSize(gl, gl.ELEMENT_ARRAY_BUFFER);
  //   gl.drawElements(gl.TRIANGLES, bufferSize >> 1, 
  //     gl.UNSIGNED_SHORT, 0);
  // },
});

export function createProgram(gl, vs, fs) {
  const prog = gl.createProgram();
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.linkProgram(prog);

  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
    throw new Error('Incorrect program link');
  }

  return prog;
}

export function createShader(gl, type, text) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, text);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    throw new Error('Incorrect shader compile');
  }

  return shader;
}

export function createBuffer(gl, target, data) {
  const buffer = gl.createBuffer();
  gl.bindBuffer(target, buffer);
  gl.bufferData(target, data, gl.STATIC_DRAW);
  return buffer;
}

// export function getBufferSize(gl, target) {
//   return gl.getBufferParameter(target, gl.BUFFER_SIZE);
// }