const municipios = [
  { nombre: "Medellín", imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyxdy-e1tURwcRnBTPWapj2S3sHKLIfU0SAw&s" },
  { nombre: "Bogotá", imagen: "https://www.shutterstock.com/image-vector/mapa-de-las-localidades-600nw-2546713977.jpg" },
  { nombre: "Cali", imagen: "https://caracoltv.brightspotcdn.com/dims4/default/819d95b/2147483647/strip/true/crop/851x479+0+14/resize/1280x720!/format/webp/quality/75/?url=http%3A%2F%2Fcaracol-brightspot.s3.us-west-2.amazonaws.com%2F71%2F45%2F47526f864e1daaa6ada51fe1c23f%2Flocalidades-cali.png" },
  { nombre: "Barranquilla", imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_Il-4_1LYl4ehxM9QB9sqa9TGqfNjzww0iA&s" },
  { nombre: "Cartagena", imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeqm9yTv1yg6LTXyU5Q2TmLm_pQknY040wmg&s"},
  { nombre: "Santa Marta", imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT20qm7DQW2ipqqxuKwfrSSk8ONhFTjtDXBTQ&s"},
  { nombre: "Bucaramanga", imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLs22KUKr0aE4qMPh3fPca1HrlKdJi4_-mXw&s"},
  { nombre: "Pereira", imagen: "https://upload.wikimedia.org/wikipedia/commons/b/be/Mapa_Diocesis_de_Pereira.svg"},
  { nombre: "Ibague", imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRSk4SuRk5Qtycd0-UurGax5faFb-83pJrtw&s"},
  { nombre: "Villavicencio", imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-pqLT9f_cUXKd_cPU3sb0eKR6Z8Aa_WwlKw&s"},
];

// Duplicamos las cartas: una con nombre, otra con imagen
let cards = [];
municipios.forEach((m) => {
  cards.push({ tipo: "nombre", valor: m.nombre });
  cards.push({ tipo: "imagen", valor: m });
});

// Barajar cartas
cards = cards.sort(() => Math.random() - 0.5);

const gameBoard = document.getElementById('gameBoard');
let flippedCards = [];
let matchedPairs = 0;

function createCard(cardData) {
  const card = document.createElement('div');
  card.classList.add('card');

  const cardInner = document.createElement('div');
  cardInner.classList.add('card-inner');

  const front = document.createElement('div');
  front.classList.add('card-front');
  front.textContent = "¿?";

  const back = document.createElement('div');
  back.classList.add('card-back');

  if (cardData.tipo === "nombre") {
    back.textContent = cardData.valor;
  } else {
    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.alignItems = 'center';

    const img = document.createElement('img');
    img.src = cardData.valor.imagen;
    img.alt = cardData.valor.nombre;

    const label = document.createElement('span');
    label.textContent = cardData.valor.nombre;

    container.appendChild(img);
    container.appendChild(label);
    back.appendChild(container);
  }

  cardInner.appendChild(front);
  cardInner.appendChild(back);
  card.appendChild(cardInner);

  card.addEventListener('click', () => flipCard(card, cardData));
  return card;
}

function flipCard(card, data) {
  if (flippedCards.length < 2 && !card.classList.contains('flipped')) {
    card.classList.add('flipped');
    flippedCards.push({ card, data });

    if (flippedCards.length === 2) {
      setTimeout(checkMatch, 700);
    }
  }
}

function checkMatch() {
  const [first, second] = flippedCards;

  let isMatch = false;
  if (first.data.tipo !== second.data.tipo) {
    if (first.data.tipo === "nombre") {
      isMatch = first.data.valor === second.data.valor.nombre;
    } else {
      isMatch = second.data.valor === first.data.valor.nombre;
    }
  }

  if (!isMatch) {
    first.card.classList.remove('flipped');
    second.card.classList.remove('flipped');
  } else {
    matchedPairs++;
    if (matchedPairs === municipios.length) {
      setTimeout(() => alert("🎉 ¡Has completado el memorama!"), 300);
    }
  }

  flippedCards = [];
}

cards.forEach(cardData => {
  const cardElement = createCard(cardData);
  gameBoard.appendChild(cardElement);
});