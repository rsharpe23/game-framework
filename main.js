import glUtil from "./lib/gl-util.js";
import matrix from "./lib/matrix/index.js";

import shaders from "./assets/shaders/default.js";
import program from "./program.js";

import light from "./light.js";
import objects from "./objects.js";

const gl = getContext();
const glu = glUtil(gl);
const prog = getProgram(gl, glu);

const [pMatrix, mvMatrix, nMatrix] = getMatrixList();
const drawableObjects = getDrawableObjects(glu, objects);

gl.clearColor(0.3, 0.6, 0.9, 1.0);
gl.enable(gl.DEPTH_TEST);
gl.useProgram(prog);

// START DRAW

gl.viewport(0, 0, 640, 480);
gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

initProjectionAndModelView(pMatrix, mvMatrix);
gl.uniformMatrix4fv(prog.u_PMatrix, false, pMatrix);

setLightUniforms(gl, prog, light);

for (const { transform, material, buffers } of drawableObjects) {
  transformMatrix(mvMatrix, transform);
  gl.uniformMatrix4fv(prog.u_MVMatrix, false, mvMatrix);

  matrix.mat3.normalFromMat4(nMatrix, mvMatrix);
  gl.uniformMatrix3fv(prog.u_NMatrix, false, nMatrix);

  setMaterialUniforms(gl, prog, material);
  glu.setTexture(prog.u_Sampler, material.texture);

  setAttributePointers(glu, prog, buffers);

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
  prog.attachUniform('u_MVMatrix');
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

function getMatrixList() {
  const { mat3, mat4 } = matrix;
  return [mat4.create(), mat4.create(), mat3.create()];
}

function initProjectionAndModelView(pMatrix, mvMatrix) {
  matrix.mat4.perspective(pMatrix, 1.04, 640 / 480, 0.1, 100.0);
  matrix.lookAt(mvMatrix, [0.0, 0.0, 5.0], [0.0, 0.0, 0.0]);
}

// --------

function getDrawableObjects(glu, objects) {
  const drawableObjects = [];
  for (const obj of objects)
    drawableObjects.push(getDrawableObject(glu, obj));

  return drawableObjects;
}

function getDrawableObject(glu, { transform, geometry, material: m }) {
  const material = getMaterial(glu, m);
  const buffers = getBuffers(glu, geometry);
  return { transform, material, buffers };
}

function getBuffers(glu, { vertices, normals, uvs, indices }) {
  const vbo = glu.createBuffer(vertices, 3);
  const nbo = glu.createBuffer(normals, 3);
  const tbo = glu.createBuffer(uvs, 2);
  const ibo = glu.createIndexBuffer(indices);
  return { vbo, nbo, tbo, ibo };
}

function getMaterial(glu, { ambientColor, diffuseColor, specularColor }) {
  const texture = getTexture(glu);
  return { ambientColor, diffuseColor, specularColor, texture };
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
  // matrix.mat4.identity(mat);
  matrix.translate(mvMatrix, position);
  matrix.rotate(mvMatrix, rotation);
  matrix.scale(mvMatrix, scale);
}