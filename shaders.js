export default {
  vert: glsl`
    const float c_Shininess = 16.0;
    
    uniform mat4 u_PMatrix;
    uniform mat4 u_MVMatrix;
    uniform mat3 u_NMatrix;

    uniform vec3 u_AmbientMaterialColor;
    uniform vec3 u_DiffuseMaterialColor;
    uniform vec3 u_SpecularMaterialColor;
    
    uniform vec3 u_AmbientLightColor;
    uniform vec3 u_DiffuseLightColor;
    uniform vec3 u_SpecularLightColor;
    uniform vec3 u_LightPos;

    attribute vec4 a_Pos;
    attribute vec3 a_Normal; 
    
    varying mediump vec4 v_Color;
    
    vec3 getTransformedPos();
    vec4 getColor(float, float);
    
    void main() {
      gl_Position = u_PMatrix * u_MVMatrix * a_Pos;
      
      vec3 tPos = getTransformedPos();
      vec3 tNormal = normalize(u_NMatrix * a_Normal);
    
      vec3 lightDir = normalize(u_LightPos - tPos);
      vec3 reflDir = normalize(reflect(-lightDir, tNormal));
      vec3 viewDir = -normalize(tPos);
    
      float diffuseDot = max(dot(tNormal, lightDir), 0.0);
    
      float specularDot = max(dot(reflDir, viewDir), 0.0);
      specularDot = pow(specularDot, c_Shininess);
    
      v_Color = getColor(diffuseDot, specularDot);
    }
    
    vec3 getTransformedPos() {
      vec4 pos = u_MVMatrix * a_Pos;
      return pos.xyz / pos.w; 
    }
    
    vec4 getColor(float diffuseDot, float specularDot) {
      vec3 ambientRefl = u_AmbientMaterialColor * u_AmbientLightColor;
      vec3 diffuseRefl = u_DiffuseMaterialColor * u_DiffuseLightColor * diffuseDot;
      vec3 specularRefl = u_SpecularMaterialColor * u_SpecularLightColor * specularDot;
      return vec4(ambientRefl + diffuseRefl + specularRefl, 1.0);
    }
  `,

  frag: glsl`
    varying mediump vec4 v_Color;

    void main() {
      gl_FragColor = v_Color;
    }
  `,
};