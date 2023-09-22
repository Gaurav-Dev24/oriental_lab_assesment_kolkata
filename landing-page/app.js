// Define the API endpoint
const apiUrl = "https://jsonplaceholder.typicode.com/users";

// Function to fetch user data from the API
async function fetchUserData() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data;
    // console.log(data)
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
}

// Function to create a card element
function createCard(user) {
  const card = document.createElement("div");
  card.classList.add("card");

  const cardContent = `
        <h2 class="card-heading">${user.name}</h2>
        <p class="card-paragraph"><strong>Email:</strong> ${user.email}</p>
        <p class="card-paragraph"><strong>Phone:</strong> ${user.phone}</p>
        <p class="card-paragraph"><strong>Responsibility &nbsp; &nbsp;</strong><i class="fa-solid fa-angle-down"></i></p>
             
        <button class="btn">View More</button>
    `;

  card.innerHTML = cardContent;
  return card;
}

// Function to display cards in the slider
async function displayCards() {
  const slider = document.getElementById("slider");
  const userData = await fetchUserData();

  if (userData && Array.isArray(userData)) {
    userData.slice(0, 20).forEach((user) => {
      const card = createCard(user);
      slider.appendChild(card);
    });
  }
}

// Call the function to display the cards
displayCards();

// Slider functionality
let currentIndex = 0;
const cardWidth = 320; // Width of each card
const cardsToShow = 4; // Number of cards to show at a time

function prevSlide() {
  if (currentIndex > 0) {
    currentIndex--;
    moveSlider();
  }
}

function nextSlide() {
  const totalCards = document.querySelectorAll(".card").length;
  if (currentIndex < totalCards - cardsToShow) {
    currentIndex++;
    moveSlider();
  }
}

function moveSlider() {
  const slider = document.getElementById("slider");
  slider.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
}

// Initial slider position
moveSlider();


const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const carousel = document.querySelector('.carousel');

// let currentIndex = 0;

prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + carousel.children.length) % carousel.children.length;
    updateCarousel();
});

nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % carousel.children.length;
    updateCarousel();
});

function updateCarousel() {
    const offset = -currentIndex * 100;
    carousel.style.transform = `translateX(${offset}%)`;
}

// Initialize the carousel
updateCarousel();
