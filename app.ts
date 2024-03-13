/*
    El problema del viajante: Dada una lista de ciudades y las distancias entre cada par de ciudades, 
    pide al candidato que encuentre la ruta más corta posible que visite cada ciudad exactamente una vez y 
    regrese a la ciudad de origen (Caracas a ciudad bolivar)
 */

interface IDistance {
  origen: string;
  destino: string;
  distancia: number;
}    

const distances: IDistance[][] = [
    [
      {
        "origen": "Caracas",
        "destino": "Barcelona",
        "distancia": 127
      },
      {
        "origen": "Caracas",
        "destino": "Valencia",
        "distancia": 98
      },
      {
        "origen": "Caracas",
        "destino": "Ciudad Bolívar",
        "distancia": 398
      }
    ],
    [
      {
        "origen": "Ciudad Bolívar",
        "destino": "Caracas",
        "distancia": 398
      },
      {
        "origen": "Ciudad Bolívar",
        "destino": "Valencia",
        "distancia": 476
      },
      {
        "origen": "Ciudad Bolívar",
        "destino": "Barcelona",
        "distancia": 285
      }
    ],
    [
      {
        "origen": "Valencia",
        "destino": "Caracas",
        "distancia": 98
      },
      {
        "origen": "Valencia",
        "destino": "Barcelona",
        "distancia": 215
      },
      {
        "origen": "Valencia",
        "destino": "Ciudad Bolívar",
        "distancia": 476
      }
    ],
    [
      {
        "origen": "Barcelona",
        "destino": "Caracas",
        "distancia": 127
      },
      {
        "origen": "Barcelona",
        "destino": "Ciudad Bolívar",
        "distancia": 285
      },
      {
        "origen": "Barcelona",
        "destino": "Valencia",
        "distancia": 215
      }
    ]
  ];

var route: string[] = [];

function getLessNumber(array) {
  // Usar un valor inicial diferente a 0 para `min`
  let min = Infinity;

  // Filtrar los valores 0
  const filteredArray = array.filter((num) => num !== 0);

  // Encontrar el mínimo del array filtrado
  if (filteredArray.length > 0) {
    min = filteredArray.reduce((min, num) => Math.min(min, num));
  }

  return min;
}

function isVectorZero(array) {
  return array.every((num) => num === 0);
}

function getLessROUTE(element) {

  console.log(element);
  let numbers = element.map((x: IDistance) => {
    
    if(route.indexOf(x.destino) <= -1) {
      return x.distancia;
    }else {
      return 0;
    }
  });

  console.log(numbers);
  let next = null;

  if(!isVectorZero(numbers)) {
    let min = getLessNumber(numbers);
    console.log("imprimiendo minimo ",min);

    element.forEach(item => {
        
      if(item.distancia == min) {
          next = item;
      }
    });
  }else {
    console.log("vector 0");
    next = 0;
  }
  return next;
}

function findIndex(route: IDistance) {

  for(let i = 0; i < distances.length; i++) {

    if(distances[i][0].origen === route.destino) {
      return i;
    }
  }

  return 0;
}


function main() {

  let  first = distances[0][0];
  let index = 0;
  let next = null;

  while(route.length < (distances.length + 1)) {
    
    console.log("index ",index);
    
    if(next == null ) {
      route.push(first.origen);
      next = getLessROUTE(distances[0]);
      index = findIndex(next);
    }else if(next === 0) {
      route.push(first.origen);
    }else {
      
      route.push(next.destino);
      next = getLessROUTE(distances[index])
      index = findIndex(next);
    }
  }

  console.log(route);
 

}

main();