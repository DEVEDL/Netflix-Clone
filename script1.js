const API_KEY = 'd2c9a6a74135f0e066981438fe179ce7';
const TRENDING_URL = `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`;
const IMG_BASE = 'https://image.tmdb.org/t/p/w500';

async function fetchTrending() {
  const res = await fetch(TRENDING_URL);
  const data = await res.json();
  const moviesContainer = document.getElementById('trending');
  data.results.forEach(movie => {
    const img = document.createElement('img');
    img.src = IMG_BASE + movie.poster_path;
    img.alt = movie.title;
    img.addEventListener('click', () => showTrailer(movie.id));
    moviesContainer.appendChild(img);
  });
  showBanner(data.results[0]);
}

async function showTrailer(movieId) {
  const res = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY}`);
  const data = await res.json();
  const trailer = data.results.find(vid => vid.type === 'Trailer' && vid.site === 'YouTube');
  if (trailer) {
    const frame = document.getElementById('trailer-frame');
    frame.src = `https://www.youtube.com/embed/${trailer.key}?autoplay=1`;
    document.getElementById('trailer-popup').style.display = 'flex';
  }
}

function showBanner(movie) {
  const banner = document.querySelector('.banner');
  banner.style.backgroundImage = `url(${IMG_BASE + movie.backdrop_path})`;
  document.getElementById('banner-title').textContent = movie.title;
  document.getElementById('banner-description').textContent = movie.overview;
}

document.getElementById('close-popup').addEventListener('click', () => {
  document.getElementById('trailer-popup').style.display = 'none';
  document.getElementById('trailer-frame').src = '';
});

window.onload = fetchTrending;