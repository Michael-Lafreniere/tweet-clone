const form = document.querySelector('.tweeter-form');
const loadingElement = document.querySelector('.loading');

const API_URL = 'http://192.168.1.71:3000/post';

loadingElement.style.display = 'none';

function checkStatus(response) {
  if (response.ok) {
    return Promise.resolve(response);
  }

  return response.json().then(json => {
    const error = new Error(json.message || response.statusText);
    return Promise.reject(Object.assign(error, { response }));
  });
}

form.addEventListener('submit', async e => {
  e.preventDefault();
  const formData = new FormData(form);
  const name = formData.get('name');
  const chirp = formData.get('tweeter');

  const chirpy = { name, chirp };

  console.log(chirp);

  form.style.display = 'none';
  loadingElement.style.display = '';

  const response = await fetch(API_URL, {
    method: 'POST',
    body: JSON.stringify(chirpy),
    headers: {
      'content-type': 'application/json'
    }
  });

  checkStatus(response);

  form.style.display = '';
  loadingElement.style.display = 'none';
});
