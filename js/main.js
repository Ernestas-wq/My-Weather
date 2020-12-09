const WEATHER_API_KEY = "2988909ac8e7345682a2988e965f721b";
const FLICKR_API_KEY = "daad5c6194666cd0ee23c9e6b0d2d000";
const form = document.getElementById("weatherSearch");
const searchInput = document.getElementById("search");
const searchMessage = document.getElementById("searchMessage");
const cityList = document.getElementById("cityList");
const imageBox = document.getElementById("imageBox");
const imageBoxHeading = document.getElementById("imageBoxHeading");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchVal = searchInput.value;
  fetchWeather(searchVal);
});

// Fetch weather
const fetchWeather = async (searchVal) => {
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${searchVal}&appid=${WEATHER_API_KEY}&units=metric`
    );
    const data = await res.json();
    createCard(data);
    const flickrUrl = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${FLICKR_API_KEY}&tags=${
      data.name
    }&text=${
      data.name + " city"
    }&safe_search=1&per_page=9&content_type=1&sort=relevance&format=json&nojsoncallback=1`;
    fetchImages(flickrUrl);
  } catch (err) {
    console.error(err);
  }
};

// Create card to hold data of weather
function createCard(data) {
  const li = document.createElement("li");
  li.classList.add("weather__city");
  const icon = `https://openweathermap.org/img/wn/${data.weather[0]["icon"]}@2x.png`;
  const markup = `<h2 class ="weather__heading" data-name="${data.name},${data.sys.country}">
  <span>${data.name}</span>
  <sup>${data.sys.country}</sup>
  </h2>
  <div class="weather__temp">${Math.round(data.main.temp)}<sup>°C</sup>
  </div>
  <figure>
  <img class="weather__icon" src=${icon} alt="${data.weather[0]["main"]}">
  <figcaption>${data.weather[0]["description"]} </figcaption>
  </figure>`;
  flickrValue = data.name;
  li.innerHTML = markup;
  cityList.appendChild(li);
}
// Get some pictures of the searched city
const fetchImages = async (url) => {
  try {
    const res = await fetch(url);
    const data = await res.json();
    data.photos.photo.forEach((photo) => {
      let imageSrc = `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_w.jpg`;
      createImageHolder(imageSrc);
    });
  } catch (err) {
    console.error(err);
  }
};
// Create image container from the fetched url
function createImageHolder(url) {
  let div = document.createElement("div");
  div.classList.add("imageHolder");
  let markup = `<img src="${url}" alt="city"> `;
  div.innerHTML = markup;
  imageBox.appendChild(div);
}
