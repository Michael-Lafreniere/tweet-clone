const form = document.querySelector('.tweeter-form');
const loadingElement = document.querySelector('.loading');

const API_URL = 'http://localhost:3000/post';

loadingElement.style.display = 'none';

form.addEventListener('submit', e => {
  e.preventDefault();
  const formData = new FormData(form);
  const name = formData.get('name');
  const tweeter = formData.get('tweeter');

  const chirp = { name, tweeter };

  console.log(chirp);

  form.style.display = 'none';
  loadingElement.style.display = '';

  fetch(API_URL, {
    method: 'POST',
    body: JSON.stringify(chirp),
    headers: {
      'content-type': 'application/json'
    }
  });
});
