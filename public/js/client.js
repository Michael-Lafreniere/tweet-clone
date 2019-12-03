const form = document.querySelector('.tweeter-form');
const loadingElement = document.querySelector('.loading');

const API_URL = 'http://192.168.1.71:3000/chirp';

form.style.display = 'none';
loadingElement.style.display = '';

const buildChirp = chirp => {
  const chirpDiv = document.createElement('div');
  chirpDiv.className = 'chirp';
  const nameDiv = document.createElement('div');
  nameDiv.className = 'name';
  nameDiv.textContent = 'Name:';
  const name = document.createElement('span');
  name.textContent = chirp.name;
  nameDiv.appendChild(name);
  const chirpMsgDiv = document.createElement('div');
  chirpMsgDiv.className = 'chirp-message';
  chirpMsgDiv.textContent = 'Chirp:';
  const chirpMsg = document.createElement('span');
  chirpMsg.textContent = chirp.post;
  chirpMsgDiv.appendChild(chirpMsg);
  const date = document.createElement('small');
  date.textContent = chirp.date;
  chirpDiv.appendChild(nameDiv);
  chirpDiv.appendChild(chirpMsgDiv);
  chirpDiv.appendChild(date);

  return chirpDiv;
};

const buildChirpsList = chirps => {
  const chirpsDiv = document.querySelector('.chirps');
  chirpsDiv.innerHTML = '';
  for (let i = 0; i < chirps.length; i++) {
    const chirp = buildChirp(chirps[i]);
    chirpsDiv.appendChild(chirp);
  }
};

const getAllChirps = () => {
  fetch(API_URL)
    .then(res => res.json())
    .then(chirps => {
      buildChirpsList(chirps.reverse());
      form.style.display = '';
      loadingElement.style.display = 'none';
    });
};

form.addEventListener('submit', e => {
  e.preventDefault();
  const formData = new FormData(form);
  const name = formData.get('name');
  const chirp = formData.get('tweeter');

  const chirpy = { name, chirp };

  form.style.display = 'none';
  loadingElement.style.display = '';

  fetch(API_URL, {
    method: 'POST',
    body: JSON.stringify(chirpy),
    headers: {
      'content-type': 'application/json'
    }
  })
    .then(res => res.json())
    .then(chirp => {
      const tweeter = document.getElementById('tweeter');
      tweeter.value = tweeter.defaultValue;

      getAllChirps();
    })
    .catch(err => console.log('Error:', err));
});

getAllChirps();
