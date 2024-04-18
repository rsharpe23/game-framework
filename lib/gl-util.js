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

  createTexture(img, flipY) {
    flipY && gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    return createTexture(gl, img, {
      [gl.TEXTURE_MAG_FILTER]: gl.NEAREST,
      [gl.TEXTURE_MIN_FILTER]: gl.NEAREST,
    });
  },

  setTexture(sampler, texture) {
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.uniform1i(sampler, 0);
  },

  setAttributePointer(attr, buffer) {
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.vertexAttribPointer(attr, buffer.itemsPerAttr, 
      buffer.itemType, false, 0, 0);
  },

  drawElements({ count }) {
    gl.drawElements(gl.TRIANGLES, count, gl.UNSIGNED_SHORT, 0);
  },
});

export function createProgram(gl, vs, fs) {
  const program = gl.createProgram();
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS))
    throw new Error('Incorrect program link');

  return program;
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

export function createTexture(gl, img, params) {
  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);

  for (const [key, value] of Object.entries(params))
    gl.texParameteri(gl.TEXTURE_2D, key, value);

  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, 
    gl.UNSIGNED_BYTE, img);

  return texture;
}

// function drawElements() {
//   const bufferSize = getBufferSize(gl, gl.ELEMENT_ARRAY_BUFFER);
//   gl.drawElements(gl.TRIANGLES, bufferSize >> 1, 
//     gl.UNSIGNED_SHORT, 0);
// },

// function getBufferSize(gl, target) {
//   return gl.getBufferParameter(target, gl.BUFFER_SIZE);
// }