import glUtil from "./lib/gl-util.js";
import matrix from "./lib/matrix/index.js";

import shaders from "./assets/shaders/default.js";
import program from "./program.js";

import light from "./light.js";
import objects from "./objects.js";

const gl = getContext();
const glu = glUtil(gl);
const prog = getProgram(gl, glu);

const { pMatrix, vMatrix, mMatrix, nMatrix } = getMatrices();
const drawableObjects = getDrawableObjects(glu, objects);

gl.clearColor(0.3, 0.6, 0.9, 1.0);
gl.enable(gl.DEPTH_TEST);
gl.useProgram(prog);

// START DRAW

gl.viewport(0, 0, 640, 480);
gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

initViewProjectionMatrices(pMatrix, vMatrix);
gl.uniformMatrix4fv(prog.u_PMatrix, false, pMatrix);
gl.uniformMatrix4fv(prog.u_VMatrix, false, vMatrix);

setLightUniforms(gl, prog, light);

for (const { transform, material, buffers } of drawableObjects) {
  matrix.push(mMatrix);

  transformMatrix(mMatrix, transform);
  gl.uniformMatrix4fv(prog.u_MMatrix, false, mMatrix);

  glMatrix.mat3.normalFromMat4(nMatrix, mMatrix);
  gl.uniformMatrix3fv(prog.u_NMatrix, false, nMatrix);

  matrix.pop(mMatrix);

  setMaterialUniforms(gl, prog, material);
  glu.setTexture(prog.u_Sampler, material.texture);

  setAttributePointers(glu, prog, buffers);

  // Если отрисовывается один и тот же объект несколько раз подряд, 
  // тогда достаточно привязать его буферы только один раз.
  glu.drawElements(buffers.ibo);
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
  prog.attachAttribute('a_TexCoord');

  prog.attachUniform('u_PMatrix');
  prog.attachUniform('u_VMatrix');
  prog.attachUniform('u_MMatrix');
  prog.attachUniform('u_NMatrix');

  prog.attachUniform('u_AmbientLightColor');
  prog.attachUniform('u_DiffuseLightColor');
  prog.attachUniform('u_SpecularLightColor');
  prog.attachUniform('u_LightPos');

  prog.attachUniform('u_AmbientMaterialColor');
  prog.attachUniform('u_DiffuseMaterialColor');
  prog.attachUniform('u_SpecularMaterialColor');
  prog.attachUniform('u_Sampler');
}

function getMatrices() {
  const { mat3, mat4 } = glMatrix;
  return {
    pMatrix: mat4.create(mat4), 
    vMatrix: mat4.create(mat4), 
    mMatrix: mat4.create(mat4), 
    nMatrix: mat3.create(mat3)
  };
}

function initViewProjectionMatrices(pMatrix, vMatrix) {
  glMatrix.mat4.perspective(pMatrix, 1.04, 640 / 480, 0.1, 100.0);
  matrix.lookAt(vMatrix, [0.0, 0.0, 5.0], [0.0, 0.0, 0.0]);
}

// --------

function getDrawableObjects(glu, objects) {
  const drawableObjects = [];
  for (const obj of objects) {
    drawableObjects.push(getDrawableObject(glu, obj));
  }
  return drawableObjects;
}

function getDrawableObject(glu, { transform, geometry, material: m }) {
  const material = getMaterial(glu, m);
  const buffers = getBuffers(glu, geometry);
  return { transform, material, buffers };
}

function getBuffers(glu, { vertices, normals, texCoords, indices }) {
  return { 
    vbo: glu.createBuffer(vertices, 3), 
    nbo: glu.createBuffer(normals, 3), 
    tbo: glu.createBuffer(texCoords, 2), 
    ibo: glu.createIndexBuffer(indices), 
  };
}

function getMaterial(glu, { ambientColor, diffuseColor, specularColor }) {
  const texture = getTexture(glu);
  return { ambientColor, diffuseColor, specularColor, texture, };
}

function getTexture(glu) {
  const img = document.getElementById('texture');
  return glu.createTexture(img, true);
}

// --------

function setLightUniforms(gl, prog, light) {
  gl.uniform3fv(prog.u_AmbientLightColor, light.ambientColor);
  gl.uniform3fv(prog.u_DiffuseLightColor, light.diffuseColor);
  gl.uniform3fv(prog.u_SpecularLightColor, light.specularColor);
  gl.uniform3fv(prog.u_LightPos, light.position);
}

function setMaterialUniforms(gl, prog, material) {
  gl.uniform3fv(prog.u_AmbientMaterialColor, material.ambientColor);
  gl.uniform3fv(prog.u_DiffuseMaterialColor, material.diffuseColor);
  gl.uniform3fv(prog.u_SpecularMaterialColor, material.specularColor);
}

function setAttributePointers(glu, prog, buffers) {
  glu.setAttributePointer(prog.a_Pos, buffers.vbo);
  glu.setAttributePointer(prog.a_Normal, buffers.nbo);
  glu.setAttributePointer(prog.a_TexCoord, buffers.tbo);
}

function transformMatrix(mvMatrix, { position, rotation, scale }) {
  matrix.translate(mvMatrix, position);
  matrix.rotate(mvMatrix, rotation);
  matrix.scale(mvMatrix, scale);
}