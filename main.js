import glUtil from "./gl-util.js";
import matrix from "./matrix/index.js";

import shaders from "./shaders.js";
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

// DrawableObject должен хранить именно ссылки, а не конкретные 
// значения, чтобы была возможность менять их в рантайме.
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