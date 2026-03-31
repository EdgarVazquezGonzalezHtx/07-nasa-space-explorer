
// Referenes for space facts
const factText = document.getElementById('factText');
// Get references to DOM elements for modal and gallery
const modal = document.getElementById('imageModal');
const closeModalButton = document.getElementById('closeModal');
const modalImage = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalDate = document.getElementById('modalDate');
const modalExplanation = document.getElementById('modalExplanation');

// API key for NASA's APOD API
const API_KEY = "T49Y86L468avfnsKJyAfqrfm4fwHz4KGYmDU7jiL";

const button = document.getElementById('getImagesButton');
const startInput = document.getElementById('startDate');
const endInput = document.getElementById('endDate');
const gallery = document.getElementById('gallery');

// Array of space facts
const spaceFacts = [
  "A day on Venus is longer than a year on Venus.",
  "Neutron stars can spin at more than 600 times per second.",
  "One million Earths could fit inside the Sun.",
  "There are more stars in the universe than grains of sand on all the beaches on Earth.",
  "The footprints left on the Moon can last for millions of years.",
  "Jupiter has the shortest day of any planet in our solar system.",
  "Saturn could float in water because it is mostly made of gas.",
  "Light from the Sun takes about 8 minutes to reach Earth."
];


// Set up default date inputs
setupDateInputs(startInput, endInput);
showRandomSpaceFact();

// Button click
button.addEventListener('click', getSpaceImages);

async function getSpaceImages() {
  const startDate = startInput.value;
  const endDate = endInput.value;

  if (!startDate || !endDate) {
    gallery.innerHTML = `<p>Please select both dates.</p>`;
    return;
  }

  try {
    gallery.innerHTML = `<p>Loading images...</p>`;

    const url = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&start_date=${startDate}&end_date=${endDate}`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const data = await response.json();

    gallery.innerHTML = "";

    data.reverse().forEach(item => {
      const card = document.createElement('div');
      card.className = 'gallery-item';

      card.innerHTML = `
        ${
          item.media_type === 'image'
            ? `<img src="${item.url}" alt="${item.title}">`
            : `<p>Video: <a href="${item.url}" target="_blank">Watch here</a></p>`
        }
        <p><strong>${item.title}</strong></p>
        <p>${item.date}</p>
        <p>${item.explanation}</p>
      `;

      gallery.appendChild(card);

      card.addEventListener('click', () => {
      if (item.media_type === 'image') {
        openModal(item);
      }
});
    });
  } catch (error) {
    gallery.innerHTML = `<p>Error loading space images.</p>`;
    console.error(error);
  }
}

// Modal function to open and close the image details
function openModal(item) {
  modalImage.src = item.url;
  modalImage.alt = item.title;
  modalTitle.textContent = item.title;
  modalDate.textContent = item.date;
  modalExplanation.textContent = item.explanation;
  modal.classList.remove('hidden');
}

function closeModal() {
  modal.classList.add('hidden');
}

closeModalButton.addEventListener('click', closeModal);

modal.addEventListener('click', (event) => {
  if (event.target === modal) {
    closeModal();
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeModal();
  }
});

// Function for space facts
function showRandomSpaceFact() {
  const randomIndex = Math.floor(Math.random() * spaceFacts.length);
  factText.textContent = spaceFacts[randomIndex];
}