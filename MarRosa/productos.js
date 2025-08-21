// Se declara una variable constante llamada 'productos' que contendrá un array de objetos.
const productos = [
  {
    // Objeto 1: Contiene la información del primer producto.
    id: "flor-sakura-rosada", // Un identificador único para el producto.
    name: "Flor Sakura Rosada", // El nombre del charm que se muestra al usuario.
    price: 4200, // El precio del charm.
    description: "Delicado charm de flor de cerezo rosa, perfecto para un toque de primavera.", // Una breve descripción del producto.
    image: "FlorSakuraRosada.jpg", // El nombre del archivo de imagen del producto.
    detailPage: "p1.html" // La página HTML donde se ven los detalles de este producto.
  },
  {
    // Objeto 2: Información del segundo producto.
    id: "zapatillas-ballet",
    name: "Zapatillas de Ballet",
    price: 4800,
    description: "Elegantes zapatillas de ballet con detalles sutiles, para los amantes de la danza.",
    image: "ZapatillasDeBallet.jpg",
    detailPage: "p2.html"
  },
  {
    // Objeto 3: Información del tercer producto.
    id: "perro-globo-plateado",
    name: "Perro Globo Plateado",
    price: 3600,
    description: "Un divertido charm de perro globo en un acabado plateado brillante.",
    image: "PerroGloboPlateado.jpg",
    detailPage: "p3.html"
  },
  {
    // Objeto 4: Información del cuarto producto.
    id: "kit-fashionista",
    name: "Kit Fashionista",
    price: 5000,
    description: "Un set de encantos de moda para el estilo de vida chic.",
    image: "KitFashionista.jpg",
    detailPage: "p4.html"
  },
  {
    // Objeto 5: Información del quinto producto.
    id: "sol-luna",
    name: "Sol & Luna",
    price: 4500,
    description: "Charm dual que representa el equilibrio entre el día y la noche.",
    image: "Sol&Luna.jpg",
    detailPage: "p5.html"
  },
  {
    // Objeto 6: Información del sexto producto.
    id: "casa-up",
    name: "Casa UP",
    price: 4900,
    description: "El icónico charm de la casa con globos de la película UP.",
    image: "CasaVoladora.jpg",
    detailPage: "p6.html"
  },
  {
    // Objeto 7: Información del séptimo producto.
    id: "lumiere",
    name: "Lumière",
    price: 4200,
    description: "El encantador candelabro de la Bella y la Bestia.",
    image: "Bella y la bestia.png",
    detailPage: "p7.html"
  },
  {
    // Objeto 8: Información del octavo producto.
    id: "abeja-azul-turquesa",
    name: "Abejita Azul Turquesa",
    price: 3800,
    description: "Charm de una abejita con detalles en turquesa.",
    image: "AbejaAzulTurquesa.jpg",
    detailPage: "p8.html"
  },
  {
    // Objeto 9: Información del noveno producto.
    id: "mariquita-roja",
    name: "Mariquita Roja con Brillantes",
    price: 3900,
    description: "Una mariquita roja con brillantes, símbolo de buena suerte.",
    image: "MariquitaRoja.jpg",
    detailPage: "p9.html"
  },
  {
    // Objeto 10: Información del décimo producto.
    id: "tulipan",
    name: "Tulipán",
    price: 4000,
    description: "Elegante y misterioso tulipán púrpura.",
    image: "tulipan.png",
    detailPage: "p10.html"
  },
  {
    // Objeto 11: Información del undécimo producto.
    id: "cerezas-brillantes",
    name: "Cerezas Brillantes",
    price: 3600,
    description: "Charm de dos cerezas con detalles brillantes.",
    image: "CerezaBrillantes.jpg",
    detailPage: "p11.html"
  },
  {
    // Objeto 12: Información del duodécimo producto.
    id: "mariposa-bicolor",
    name: "Mariposa Bicolor Lila",
    price: 4400,
    description: "Encantadora mariposa con alas en dos tonos de lila.",
    image: "MariposaBicolor.jpg",
    detailPage: "p12.html"
  },
  {
    // Objeto 13: Información del decimotercer producto.
    id: "pascal",
    name: "Pascal",
    price: 4200,
    description: "El simpático camaleón Pascal de Enredados.",
    image: "pascal.jpg",
    detailPage: "p13.html"
  },
  {
    // Objeto 14: Información del decimocuarto producto.
    id: "rama-flores-mariposas",
    name: "Rama de Flores y Mariposas",
    price: 5000,
    description: "Un delicado charm con una rama, flores y mariposas.",
    image: "RamaDeFlores&Mariposas.jpg",
    detailPage: "p14.html"
  },
  {
    // Objeto 15: Información del decimoquinto producto.
    id: "cruz-corazon-rosa",
    name: "Cruz con Corazón Rosa",
    price: 3800,
    description: "Charm de una cruz con un pequeño corazón rosa.",
    image: "Cruz.jpg",
    detailPage: "p15.html"
  },
  {
    // Objeto 16: Información del decimosexto producto.
    id: "cupcake-cuchara",
    name: "Cupcake con Cuchara",
    price: 3500,
    description: "Un dulce charm de cupcake con una pequeña cuchara.",
    image: "CupcakeConCuchara.jpg",
    detailPage: "p16.html"
  },
  {
    // Objeto 17: Información del decimoséptimo producto.
    id: "pintura-arcoiris",
    name: "Paleta de Pintura Arcoíris",
    price: 4300,
    description: "Charm colorido de una paleta de pintor con un arcoíris.",
    image: "PinturaArcoiris.jpg",
    detailPage: "p17.html"
  },
  {
    // Objeto 18: Información del decimoctavo producto.
    id: "perla-concha",
    name: "Perla en Concha",
    price: 3700,
    description: "Un charm elegante de una perla dentro de una concha marina.",
    image: "PerlaConcha.jpg",
    detailPage: "p18.html"
  },
  {
    // Objeto 19: Información del decimonoveno producto.
    id: "castillo-corazon-azul",
    name: "Castillo en Corazón Azul",
    price: 5000,
    description: "Un mágico castillo dentro de un corazón azul brillante.",
    image: "CastilloAzul.jpg",
    detailPage: "p19.html"
  },
  {
    // Objeto 20: Información del vigésimo producto.
    id: "corona-princesa",
    name: "Corona de Princesa",
    price: 3900,
    description: "Una pequeña y brillante corona, digna de una princesa.",
    image: "CoronaPrincesa.jpg",
    detailPage: "p20.html"
  },
  {
    // Objeto 21: Información del vigésimo primer producto.
    id: "ramo-suenos",
    name: "El Ramo de Sueños Florecientes",
    price: 4500,
    description: "Un ramo de flores que simboliza los sueños que florecen.",
    image: "RamoSuenosFlorecientes.jpg",
    detailPage: "p21.html"
  },
  {
    // Objeto 22: Información del vigésimo segundo producto.
    id: "talisman-saber",
    name: "El Talismán del Saber Triunfante",
    price: 5000,
    description: "Charm de graduación, perfecto para celebrar logros académicos.",
    image: "Grad.jpg",
    detailPage: "p22.html"
  },
  {
    // Objeto 23: Información del vigésimo tercer producto.
    id: "colibri-tiempo",
    name: "El Colibrí del Tiempo Suspendido",
    price: 3800,
    description: "Un delicado colibrí que representa la belleza de los momentos fugaces.",
    image: "ColibriDelTiempoSuspendido.jpg",
    detailPage: "p23.html"
  },
  {
    // Objeto 24: Información del vigésimo cuarto producto.
    id: "abeja-dorada",
    name: "La Abeja Dorada del Coraje Dulce",
    price: 4200,
    description: "Una abeja dorada que inspira dulzura y valentía.",
    image: "AbejaDorada.jpg",
    detailPage: "p24.html"
  }
];