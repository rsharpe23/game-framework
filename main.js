import glUtil from "./lib/gl-util.js";
import matrix from "./lib/matrix/index.js";

import shaders from "./assets/shaders/default.js"
import program from "./program.js";

import light from "./light.js";
import objects from "./objects.js";

const gl = getContext();
const glu = glUtil(gl);
const prog = getProgram(gl, glu);
const { mat3, mat4 } = matrix;

const pMatrix = mat4.create();
const mvMatrix = mat4.create(); 
const nMatrix = mat3.create(); 
const drawableObjects = getDrawableObjects(glu);

// Создание текстуры
const u_Sampler = gl.getUniformLocation(prog, 'u_Sampler');
const a_TexCoord = gl.getAttribLocation(prog, 'a_TexCoord');
gl.enableVertexAttribArray(a_TexCoord);

const tbo = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, tbo);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
  0.0, 0.0,
  0.0, 1.0,
  1.0, 1.0,
  1.0, 0.0,

  0.0, 0.0,
  0.0, 1.0,
  1.0, 1.0,
  1.0, 0.0,

  0.0, 0.0,
  0.0, 1.0,
  1.0, 1.0,
  1.0, 0.0,

  0.0, 0.0,
  0.0, 1.0,
  1.0, 1.0,
  1.0, 0.0,

  0.0, 0.0,
  0.0, 1.0,
  1.0, 1.0,
  1.0, 0.0,

  0.0, 0.0,
  0.0, 1.0,
  1.0, 1.0,
  1.0, 0.0,
]), gl.STATIC_DRAW);

const texture = gl.createTexture();
gl.bindTexture(gl.TEXTURE_2D, texture);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);

// texImage2D() должен вызываться после привязки объекта texture
const img = document.getElementById('texture');
gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, 
  gl.UNSIGNED_BYTE, img);
// ---------------

gl.clearColor(0.3, 0.6, 0.9, 1.0);
gl.enable(gl.DEPTH_TEST);
gl.useProgram(prog);

// START DRAW

gl.viewport(0, 0, 640, 480);
gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

mat4.perspective(pMatrix, 1.04, 640 / 480, 0.1, 100.0);
gl.uniformMatrix4fv(prog.u_PMatrix, false, pMatrix);

mat4.identity(mvMatrix);
matrix.lookAt(mvMatrix, [0.0, 0.0, 5.0], [0.0, 0.0, 0.0]);

gl.uniform3fv(prog.u_AmbientLightColor, light.ambientColor);
gl.uniform3fv(prog.u_DiffuseLightColor, light.diffuseColor);
gl.uniform3fv(prog.u_SpecularLightColor, light.specularColor);
gl.uniform3fv(prog.u_LightPos, light.position);

for (const { vbo, nbo, ibo, transform, material } of drawableObjects) {
  matrix.translate(mvMatrix, transform.position);
  matrix.rotate(mvMatrix, transform.rotation);
  matrix.scale(mvMatrix, transform.scale);
  gl.uniformMatrix4fv(prog.u_MVMatrix, false, mvMatrix);

  mat3.normalFromMat4(nMatrix, mvMatrix);
  gl.uniformMatrix3fv(prog.u_NMatrix, false, nMatrix);

  gl.uniform3fv(prog.u_AmbientMaterialColor, material.ambientColor);
  gl.uniform3fv(prog.u_DiffuseMaterialColor, material.diffuseColor);
  gl.uniform3fv(prog.u_SpecularMaterialColor, material.specularColor);

  glu.vertexAttribPointer(prog.a_Pos, vbo);
  glu.vertexAttribPointer(prog.a_Normal, nbo);

  gl.bindBuffer(gl.ARRAY_BUFFER, tbo);
  gl.vertexAttribPointer(a_TexCoord, 2, gl.FLOAT, false, 0, 0);

  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.uniform1i(u_Sampler, 0);
  
  glu.drawElements(ibo);
}

// END DRAW

function getContext() {
  const canvas = document.getElementById('canvas');
  return canvas.getContext('webgl');
}

function getProgram(gl, glu) {
  const prog = program(gl, glu, shaders);
  attachData(prog);
  return prog;
}

function attachData(prog) {
  prog.attachAttribute('a_Pos');
  prog.attachAttribute('a_Normal');

  prog.attachUniform('u_PMatrix');
  prog.attachUniform('u_MVMatrix');
  prog.attachUniform('u_NMatrix');

  prog.attachUniform('u_AmbientLightColor');
  prog.attachUniform('u_DiffuseLightColor');
  prog.attachUniform('u_SpecularLightColor');
  prog.attachUniform('u_LightPos');

  prog.attachUniform('u_AmbientMaterialColor');
  prog.attachUniform('u_DiffuseMaterialColor');
  prog.attachUniform('u_SpecularMaterialColor');
}

function getDrawableObjects(glu) {
  const drawableObjects = [];
  for (const { transform, geometry, material } of objects) {
    drawableObjects.push({
      vbo: glu.createBuffer(geometry.vertices, 3),
      nbo: glu.createBuffer(geometry.normals, 3),
      ibo: glu.createIndexBuffer(geometry.indices),
      transform, material,
    });
  }

  return drawableObjects;
}