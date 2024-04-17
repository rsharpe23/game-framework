export default (gl, glu, { vert, frag }) => {
  const prog = glu.createProgram(vert, frag);

  prog.attachAttribute = attrName => {
    const attr = gl.getAttribLocation(prog, attrName);
    gl.enableVertexAttribArray(attr);
    prog[attrName] = attr;
  };

  prog.attachUniform = uniformName => {
    const uniform = gl.getUniformLocation(prog, uniformName);
    prog[uniformName] = uniform;
  };

  return prog;
};