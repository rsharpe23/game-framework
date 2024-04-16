export default [
  {
    transform: {
      position: [-1.0, 0.0, 0.0],
      rotation: [0, 0, 0, -Math.PI / 4],
      scale: [0.0, 0.0, 0.0],
    },
  
    geometry: {
      vertices: [
        //лицевая часть
        -0.5, -0.5,  0.5,
        -0.5,  0.5,  0.5,
         0.5,  0.5,  0.5,
         0.5, -0.5,  0.5,
        // задняя часть
        -0.5, -0.5, -0.5,
        -0.5,  0.5, -0.5,
         0.5,  0.5, -0.5,
         0.5, -0.5, -0.5,
        // левая часть
        -0.5, -0.5,  0.5,
        -0.5,  0.5,  0.5,
        -0.5,  0.5, -0.5,
        -0.5, -0.5, -0.5,
        // правая часть
         0.5, -0.5,  0.5,
         0.5,  0.5,  0.5,
         0.5,  0.5, -0.5,
         0.5, -0.5, -0.5,
        // верхняя часть
        -0.5,  0.5,  0.5,
        -0.5,  0.5, -0.5,
         0.5,  0.5, -0.5,
         0.5,  0.5,  0.5,
        // нижняя часть
        -0.5, -0.5,  0.5,
        -0.5, -0.5, -0.5,
         0.5, -0.5, -0.5,
         0.5, -0.5,  0.5,
      ],

      normals: [
        //лицевая часть
        0.0, 0.0, 1.0,
        0.0, 0.0, 1.0,
        0.0, 0.0, 1.0,
        0.0, 0.0, 1.0,
        // задняя часть
        0.0, 0.0, -1.0,
        0.0, 0.0, -1.0,
        0.0, 0.0, -1.0,
        0.0, 0.0, -1.0,
        // левая часть
        -1.0, 0.0, 0.0,
        -1.0, 0.0, 0.0,
        -1.0, 0.0, 0.0,
        -1.0, 0.0, 0.0,
        // правая часть
        1.0, 0.0, 0.0,
        1.0, 0.0, 0.0,
        1.0, 0.0, 0.0,
        1.0, 0.0, 0.0,
        // верхняя часть
        0.0, 1.0, 0.0,
        0.0, 1.0, 0.0,
        0.0, 1.0, 0.0,
        0.0, 1.0, 0.0,
        // нижняя часть
        0.0, -1.0, 0.0,
        0.0, -1.0, 0.0,
        0.0, -1.0, 0.0,
        0.0, -1.0, 0.0,
      ],
      
      indices: [
        // лицевая часть
        0, 1, 2,  2, 3, 0,
        // задняя часть
        4, 5, 6,  6, 7, 4,
        // левая часть
        8, 9, 10,  10, 11, 8,
        // правая часть
        12, 13, 14,  14, 15, 12,
        // верхняя часть
        16, 17, 18,  18, 19, 16,
        // нижняя часть
        20, 21, 22,  22, 23, 20,
      ],
    },
  
    material: {
      ambientColor: [0.0, 0.8, 0.0],
      diffuseColor: [0.7, 0.7, 0.7],
      specularColor: [1.0, 1.0, 1.0],
    },
  },

  {
    transform: {
      position: [1.0, 0.0, 0.0],
      rotation: [0, 0, 0, Math.PI / 4],
      scale: [0.0, 0.0, 0.0],
    },
  
    geometry: {
      vertices: [
        //лицевая часть
        -0.5, -0.5,  0.5,
        -0.5,  0.5,  0.5,
         0.5,  0.5,  0.5,
         0.5, -0.5,  0.5,
        // задняя часть
        -0.5, -0.5, -0.5,
        -0.5,  0.5, -0.5,
         0.5,  0.5, -0.5,
         0.5, -0.5, -0.5,
        // левая часть
        -0.5, -0.5,  0.5,
        -0.5,  0.5,  0.5,
        -0.5,  0.5, -0.5,
        -0.5, -0.5, -0.5,
        // правая часть
         0.5, -0.5,  0.5,
         0.5,  0.5,  0.5,
         0.5,  0.5, -0.5,
         0.5, -0.5, -0.5,
        // верхняя часть
        -0.5,  0.5,  0.5,
        -0.5,  0.5, -0.5,
         0.5,  0.5, -0.5,
         0.5,  0.5,  0.5,
        // нижняя часть
        -0.5, -0.5,  0.5,
        -0.5, -0.5, -0.5,
         0.5, -0.5, -0.5,
         0.5, -0.5,  0.5,
      ],

      normals: [
        //лицевая часть
        0.0, 0.0, 1.0,
        0.0, 0.0, 1.0,
        0.0, 0.0, 1.0,
        0.0, 0.0, 1.0,
        // задняя часть
        0.0, 0.0, -1.0,
        0.0, 0.0, -1.0,
        0.0, 0.0, -1.0,
        0.0, 0.0, -1.0,
        // левая часть
        -1.0, 0.0, 0.0,
        -1.0, 0.0, 0.0,
        -1.0, 0.0, 0.0,
        -1.0, 0.0, 0.0,
        // правая часть
        1.0, 0.0, 0.0,
        1.0, 0.0, 0.0,
        1.0, 0.0, 0.0,
        1.0, 0.0, 0.0,
        // верхняя часть
        0.0, 1.0, 0.0,
        0.0, 1.0, 0.0,
        0.0, 1.0, 0.0,
        0.0, 1.0, 0.0,
        // нижняя часть
        0.0, -1.0, 0.0,
        0.0, -1.0, 0.0,
        0.0, -1.0, 0.0,
        0.0, -1.0, 0.0,
      ],

      indices: [
        // лицевая часть
        0, 1, 2,  2, 3, 0,
        // задняя часть
        4, 5, 6,  6, 7, 4,
        // левая часть
        8, 9, 10,  10, 11, 8,
        // правая часть
        12, 13, 14,  14, 15, 12,
        // верхняя часть
        16, 17, 18,  18, 19, 16,
        // нижняя часть
        20, 21, 22,  22, 23, 20,
      ],
    },
  
    material: {
      ambientColor: [0.8, 0.0, 0.0],
      diffuseColor: [0.7, 0.7, 0.7],
      specularColor: [1.0, 1.0, 1.0],
    },
  }
];