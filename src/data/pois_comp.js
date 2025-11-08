export const POIS = [
  // --- Marinha da Troncalhada (inicial) ---
  {
    id: 'troncalhada-inicio',
    name: 'Início do Percurso',
    lat: 40.6444444,   // 40°38'40" N
    lng: -8.6613889,   // 8°39'41" O
    radius: 8,
    points: 20,
    content: {
      title: 'Início da Marinha da Troncalhada',
      text: 'Aqui começa o percurso pelas salinas. Podes explorar a história e o funcionamento da marinha.',
    },
  },
  {
    id: 'troncalhada-fim',
    name: 'Fim do Percurso',
    lat: 40.6455556,   // 40°38'44" N
    lng: -8.6627778,   // 8°39'46" O
    radius: 8,
    points: 20,
    content: {
      title: 'Fim do Percurso da Troncalhada',
      text: 'Parabéns! Chegaste ao final do percurso da Marinha da Troncalhada.',
    },
  },

  {
  id: 'cta',
  name: 'Clube de Ténis de Aveiro',
  lat: 40.638800,
  lng: -8.655000,
  radius: 15,
  points: 100,
  tags: ['desporto', 'lazer', 'bairro'],
  content: {
    title: 'Clube de Ténis de Aveiro',
    text: 'Fundado em meados do século XX, o Clube de Ténis de Aveiro é uma das principais infraestruturas desportivas da cidade. Para além dos campos de ténis, dinamiza torneios, aulas e atividades que fomentam o convívio e a prática desportiva ao ar livre.',
    image: '/assets/IMG_2889.jpg',
  },
},

{
  id: 'bangu',
  name: 'Estação de Bangu',
  lat: -22.876890,
  lng: -43.464950,
  radius: 12,
  points: 20,
  tags: ['transporte', 'história', 'bairro'],
  content: {
    title: 'Estação de Bangu',
    text: 'Inaugurada em 1890, a Estação de Bangu é um dos principais marcos históricos do bairro, tendo desempenhado papel fundamental no desenvolvimento local. Ligada à antiga Fábrica Bangu, foi responsável por facilitar o transporte de trabalhadores e mercadorias, tornando-se referência na Zona Oeste do Rio de Janeiro.',
    image: '/assets/bangu_station.jpg',
  },
},

  {
    id: 'casa-rui',
    name: 'Casa do Rui',
    lat: 40.611944,   // 40°36'43" N
    lng: -8.651389,   // 8°39'05" O
    radius: 12,
    points: 25,
    content: {
      title: 'Casa do Rui',
      text: 'Um ponto de interesse pessoal no percurso!',
    },
  },

  // --- Igreja das Carmelitas (1º ponto que enviaste) ---
  {
    id: 'igreja-carmelitas-a',
    name: 'Igreja das Carmelitas (Carmo)',
    lat: 40.638433,   // 40°38′18″ N
    lng: -8.653453,   // 8°39′12″ O
    radius: 12,
    points: 30,
    content: {
      title: 'Igreja das Carmelitas (Igreja do Carmo)',
      text: 'Construída a partir de 1613, integrou o antigo convento das Carmelitas Descalças. Fachada maneirista e interiores barrocos com talha dourada.',
      image: '/assets/IMG_2728.jpg',
    },
  },

  // --- Signo de Câncer na calçada ---
  {
    id: 'signo-cancer',
    name: 'Signo de Câncer – Praça Marquês de Pombal',
    lat: 40.638711,   // 40°38′19″ N
    lng: -8.652650,   // 8°39′09″ O
    radius: 10,
    points: 25,
    content: {
      title: 'Signo de Câncer nas Pedras do Calceteiro',
      text: 'Os calceteiros representaram os 12 signos do zodíaco no pavimento. O Câncer é um dos motivos que podes encontrar na praça.',
      image: '/assets/IMG_2729.jpg',
    },
  },

  // --- Casa do Hélio ---
  {
    id: 'casa-helio',
    name: 'Casa do Hélio',
    lat: 40.688333,   // 40°41′18″ N
    lng: -8.483611,   // 8°29′01″ O
    radius: 15,
    points: 20,
    content: {
      title: 'Casa do Hélio',
      text: 'Bom papo, comida boa e café excelente.',
    },
  },

  // --- Aveiro Center Shopping ---
  {
    id: 'aveiro-center',
    name: 'Aveiro Center Shopping',
    lat: 40.649444,   // 40°38′58″ N
    lng: -8.614722,   // 8°36′53″ O
    radius: 18,
    points: 25,
    content: {
      title: 'Aveiro Center Shopping',
      text: 'Centro comercial com lojas, restauração e serviços — ponto de encontro para compras e lazer.',
    },
  },

  // --- Teatro Aveirense ---
  {
    id: 'teatro-aveirense',
    name: 'Teatro Aveirense',
    lat: 40.640000,   // 40°38′24″ N
    lng: -8.654167,   // 8°39′15″ O
    radius: 8,
    points: 35,
    content: {
      title: 'Teatro Aveirense',
      text: 'Principal polo cultural da cidade, com programação de música, teatro, dança e cinema.',
      image: '/assets/IMG_2802.jpg',
    },
  },

  // --- Câmara Municipal ---
  {
    id: 'camara-aveiro',
    name: 'Câmara Municipal de Aveiro',
    lat: 40.640278,   // 40°38′25″ N
    lng: -8.653611,   // 8°39′13″ O
    radius: 8,
    points: 35,
    content: {
      title: 'Câmara Municipal de Aveiro',
      text: 'Edifício icónico na Praça da República, sede do governo local.',
      image: '/assets/IMG_2804.jpg',
    },
  },

 {
  id: 'igreja-misericordia',
  name: 'Igreja da Misericórdia de Aveiro',
  lat: 40.640556,   // 40°38′26″ N
  lng: -8.653611,   // 8°39′13″ O
  radius: 8,
  points: 35,
  content: {
    title: 'Igreja da Misericórdia de Aveiro',
    text: 'Construída em 1600 para acolher a Santa Casa da Misericórdia, esta igreja destaca-se pelo magnífico portal renascentista e pela fachada coberta de azulejos azuis e brancos do século XVIII. O interior é ricamente decorado com talha dourada e pinturas que retratam episódios bíblicos, refletindo a importância da instituição de apoio social e religioso na história da cidade.',
    image: '/assets/IMG_2807.jpg',
  },
},


  // --- Estátua de José Estêvão ---
  {
    id: 'estatua-jose-estevao',
    name: 'Estátua de José Estêvão',
    lat: 40.640556,   // 40°38′26″ N
    lng: -8.653889,   // 8°39′14″ O
    radius: 8,
    points: 25,
    content: {
      title: 'Estátua de José Estêvão',
      text: 'Homenagem ao político e orador liberal aveirense (1889).',
      image: '/assets/IMG_2809.jpg',
    },
  },

  // --- Assembleia Municipal ---
  {
    id: 'edificio-atlas',
    name: 'Edifício Atlas',
    lat: 40.640833,   // 40°38′27″ N
    lng: -8.654167,   // 8°39′15″ O
    radius: 8,
    points: 25,
    content: {
      title: 'Edifício Atlas',
      text: 'Espaço de participação cívica, no conjunto administrativo da Praça da República.',
      image: '/assets/IMG_2813.jpg',
    },
  },

  // --- Estátua do Marnoto ---
  {
    id: 'estatua-marnoto',
    name: 'Estátua do Marnoto',
    lat: 40.641290,   // 40°38′29″ N
    lng: -8.653889,   // 8°39′14″ O
    radius: 8,
    points: 25,
    content: {
      title: 'Estátua do Marnoto',
      text: 'Homenagem aos trabalhadores das marinhas de sal de Aveiro.',
      image: '/assets/IMG_2815.jpg',
    },
  },

  // --- Estátua da Salineira ---
  {
    id: 'estatua-salineira',
    name: 'Estátua da Salineira',
    lat: 40.641410,   // 40°38′29″ N
    lng: -8.653889,   // 8°39′14″ O
    radius: 8,
    points: 25,
    content: {
      title: 'Estátua da Salineira',
      text: 'Homenagem às mulheres das marinhas de sal — força e resiliência junto ao canal.',
      image: '/assets/IMG_2818.jpg',
    },
  },

  // --- Igreja de São João Evangelista (Carmelitas) – segundo registo (foto com azulejos) ---
  {
    id: 'igreja-carmelitas-b',
    name: 'Igreja de São João Evangelista (Carmelitas)',
    lat: 40.643056,   // 40°38′35″ N
    lng: -8.653056,   // 8°39′11″ O
    radius: 8,
    points: 35,
    content: {
      title: 'Igreja de São João Evangelista (Carmelitas)',
      text: 'Século XVII. Fachada barroca com painéis de azulejos. Marco histórico junto ao Museu de Aveiro.',
      image: '/assets/IMG_2823.jpg',
    },
  },

  // --- Nichos Religiosos ---
  {
    id: 'nicho-sao-pedro',
    name: 'Nicho de São Pedro – Rua dos Mercadores',
    lat: 40.642222,   // 40°38′32″ N
    lng: -8.653611,   // 8°39′13″ O
    radius: 8,
    points: 15,
    content: {
      title: 'Nicho de São Pedro',
      text: 'Nicho de esquina com São Pedro segurando a chave — tradição de devoção e proteção urbana.',
      image: '/assets/IMG_2833.jpg',
    },
  },
  {
    id: 'nicho-santo-antonio-menino',
    name: 'Nicho de Santo António com o Menino',
    lat: 40.641944,   // 40°38′31″ N
    lng: -8.654167,   // 8°39′15″ O
    radius: 8,
    points: 15,
    content: {
      title: 'Nicho de Santo António com o Menino',
      text: 'Devoção popular a Santo António, representado com o Menino ao colo — proteção de moradores e comerciantes.',
      image: '/assets/IMG_2834.jpg',
    },
  },
  {
  id: 'museu-santa-joana',
  name: 'Museu de Santa Joana',
  lat: 40.638900,
  lng: -8.651100,
  radius: 10,
  points: 40,
  tags: ['museu', 'património religioso', 'história'],
  content: {
    title: 'Museu de Santa Joana',
    text: 'Instalado no antigo convento de Jesus, fundado no século XV, este museu evoca a vida de Santa Joana Princesa, padroeira de Aveiro. Destacam-se o túmulo em pedra de Ançã, a igreja conventual com retábulos de talha dourada e o vasto espólio de arte sacra que testemunha a devoção e a riqueza cultural da cidade.',
    image: '/assets/IMG_2900.jpg',
  },
},
{
  id: 'se-aveiro',
  name: 'Sé de Aveiro',
  lat: 40.639600,
  lng: -8.650250,
  radius: 10,
  points: 50,
  tags: ['igreja', 'sé', 'património religioso', 'história'],
  content: {
    title: 'Sé de Aveiro',
    text: 'Antigo Convento de São Domingos (iniciado em 1423), a atual Sé ganhou traça barroca em 1719. Em frente está o Cruzeiro de Nossa Senhora da Glória; as colunas simbolizam Fé, Esperança e Caridade em torno do brasão dominicano. No interior destaca-se um retábulo de calcário coimbrão do séc. XVI, que representa a Visitação.',
    image: '/assets/IMG_2897.jpg',
  },
},
{
  id: 'fabrica-ciencia-viva',
  name: 'Fábrica Centro Ciência Viva de Aveiro',
  lat: 40.638590,
  lng: -8.657090,
  radius: 8,
  points: 35,
  tags: ['museu', 'ciência', 'família', 'educação'],
  content: {
    title: 'Fábrica Centro Ciência Viva de Aveiro',
    text: 'A Fábrica Centro Ciência Viva é um espaço interativo dedicado à divulgação científica e tecnológica. Instalado numa antiga fábrica de cerâmica, oferece exposições permanentes e temporárias, laboratórios, atividades educativas e experiências que aproximam visitantes de todas as idades ao mundo da ciência, tornando-a divertida e acessível.',
    image: '/assets/IMG_2887.jpg',
  },
},

];
