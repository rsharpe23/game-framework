export default (gl, glu, { vert, frag }) => {
  const prog = glu.createProgram(vert, frag);

  prog.attachAttribute = attrName => {
    const attr = gl.getAttribLocation(prog, attrName);
    gl.enableVertexAttribArray(attr);
    prog[attrName] = attr;
  };

  prog.attachUniform = uniformName => 
    gl.getUniformLocation(prog, uniformName);

  return prog;
};