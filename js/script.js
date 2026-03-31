//API keys for NASA's APOD API
const API = " T49Y86L468avfnsKJyAfqrfm4fwHz4KGYmDU7jiL";
const url =  `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`;
const button = document.getElementById('getImagesButton');
// Find our date picker inputs on the page
const startInput = document.getElementById('startDate');
const endInput = document.getElementById('endDate');

button.addEventListener('click', getSpaceImages);

// Call the setupDateInputs function from dateRange.js
// This sets up the date pickers to:
// - Default to a range of 9 days (from 9 days ago to today)
// - Restrict dates to NASA's image archive (starting from 1995)
setupDateInputs(startInput, endInput);

// Fetch
async function getSpaceImages() {
  const startDate = startInput.value;
  const endDate = endInput.value;

  if (!startDate || !endDate) {
    gallery.innerHTML = `<p>Please select both dates.</p>`;
    return;
  }

  try {
    gallery.innerHTML = `<p>Loading images...</p>`;

    const apiKey = "DEMO_KEY";
    const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&start_date=${startDate}&end_date=${endDate}`;

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
    });
  } catch (error) {
    gallery.innerHTML = `<p>Error loading space images.</p>`;
    console.error(error);
  }
}

