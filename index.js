window.addEventListener("load", function () {
  const preloader = document.querySelector(".preloader"); // Use querySelector to target the preloader by classname
  const content = document.getElementById("content");

  function showContent() {
    preloader.style.display = "none";
    content.style.display = "block";
  }

  function changeBackgroundColor() {
    const shadesOfPurple = [
      "#9370db", // MediumPurple
      "#8a2be2", // BlueViolet
      "#ba55d3", // MediumOrchid
      "#800080", // Purple
      "#a020f0", // Purple2
    ];

    const randomColor =
      shadesOfPurple[Math.floor(Math.random() * shadesOfPurple.length)];
    document.body.style.backgroundColor = randomColor;
  }

  function changeFontStyle() {
    const letters = document.querySelectorAll(".letter");
    letters.forEach((letter) => {
      const randomFontSize = Math.floor(Math.random() * 24) + 48; // Random font size between 48px and 72px
      letter.style.fontSize = `${randomFontSize}px`;
    });
  }

  showContent(); // Show the content after the page fully loads
});
const sliderContainer = document.querySelector(".slider-container");
const sliderTrack = document.querySelector(".slider-track");
let slides = document.querySelectorAll(".slide");
let slideWidth = slides[0].offsetWidth;
let slideIndex = 1; // Start from the first cloned slide
let touchStartX = 0;
let touchEndX = 0;
let isTransitioning = false;

function updateSliderWidth() {
  slideWidth = slides[0].offsetWidth;
  sliderTrack.style.width = `${slideWidth * slides.length}px`;
}

function slideNext() {
  if (!isTransitioning) {
    slideIndex++;
    slideTo(slideIndex);
  }
}

function slideTo(index) {
  isTransitioning = true;
  const offset = -slideWidth * index;
  sliderTrack.style.transform = `translateX(${offset}px)`;
}

function handleTransitionEnd() {
  if (slideIndex <= 0) {
    slideIndex = slides.length - 2;
    sliderTrack.style.transition = "none";
    sliderTrack.style.transform = `translateX(-${slideWidth * slideIndex}px)`;
  } else if (slideIndex >= slides.length - 1) {
    slideIndex = 1;
    sliderTrack.style.transition = "none";
    sliderTrack.style.transform = `translateX(-${slideWidth * slideIndex}px)`;
  }

  setTimeout(() => {
    sliderTrack.style.transition = "transform 0.5s ease-in-out";
    isTransitioning = false;
  }, 50);
}

document.querySelector(".next-btn").addEventListener("click", slideNext);

// Adjust the number of visible slides when the window is resized
window.addEventListener("resize", () => {
  updateSliderWidth();
  slideTo(slideIndex);
});

// Clone slides for infinite loop
const firstSlideClone = slides[0].cloneNode(true);
const lastSlideClone = slides[slides.length - 1].cloneNode(true);
sliderTrack.appendChild(firstSlideClone);
sliderTrack.insertBefore(lastSlideClone, slides[0]);

// Update slides after cloning
slides = document.querySelectorAll(".slide");

// Initialize slider
updateSliderWidth();
slideTo(slideIndex);

// Swipe functionality
sliderContainer.addEventListener("touchstart", handleTouchStart);
sliderContainer.addEventListener("touchmove", handleTouchMove);
sliderContainer.addEventListener("touchend", handleTouchEnd);

function handleTouchStart(event) {
  touchStartX = event.touches[0].clientX;
}

function handleTouchMove(event) {
  touchEndX = event.touches[0].clientX;
}

function handleTouchEnd() {
  const touchDiff = touchEndX - touchStartX;
  if (touchDiff > 50) {
    // Swipe right
    slidePrev();
  } else if (touchDiff < -50) {
    // Swipe left
    slideNext();
  }

  touchStartX = 0;
  touchEndX = 0;
}

function slidePrev() {
  if (!isTransitioning) {
    slideIndex--;
    slideTo(slideIndex);
  }
}

// Reset slider when transition ends for infinite loop
sliderTrack.addEventListener("transitionend", handleTransitionEnd);

// function addToCart(
//   productName,
//   productPrice,
//   productImage,
//   productDescription
// ) {
//   let cart = JSON.parse(getCookie("cart")) || {};

//   if (cart[productName]) {
//     cart[productName].quantity++;
//   } else {
//     cart[productName] = {
//       quantity: 1,
//       price: productPrice,
//       image: productImage,
//       description: productDescription,
//     };
//   }

//   setCookie("cart", JSON.stringify(cart));

//   updateCartCount();

//   alert(productName + " has been added to the cart");
// }

// function updateCartCount() {
//   let cart = JSON.parse(getCookie("cart")) || {};
//   let cartCount = 0;

//   for (let product in cart) {
//     if (cart.hasOwnProperty(product)) {
//       cartCount += cart[product].quantity;
//     }
//   }

//   document.getElementById("cartCount").textContent = cartCount;
// }

// // Function to set a cookie
// function setCookie(name, value) {
//   const expirationDate = new Date();
//   expirationDate.setFullYear(expirationDate.getFullYear() + 1); // Cookie will expire in 1 year
//   document.cookie = `${name}=${encodeURIComponent(
//     value
//   )}; expires=${expirationDate.toUTCString()}; path=/`;
// }

// // Function to get a cookie by name
// function getCookie(name) {
//   const cookieArr = document.cookie.split("; ");
//   for (const cookie of cookieArr) {
//     const [cookieName, cookieValue] = cookie.split("=");
//     if (cookieName === name) {
//       return decodeURIComponent(cookieValue);
//     }
//   }
//   return null;
// }

// // Call updateCartCount() on page load to set the cart count from the cookie
// updateCartCount();
// function updateCart() {
//   let cart = JSON.parse(localStorage.getItem("cart")) || {};
//   let cartList = document.getElementById("cartList");
//   let totalAmountElement = document.getElementById("totalAmount");
//   let totalAmount = 0.0;

//   // Clear the cart list
//   cartList.innerHTML = "";

//   // Populate the cart list with items from the cart object
//   for (let product in cart) {
//     if (cart.hasOwnProperty(product)) {
//       const quantity = cart[product].quantity;
//       const price = cart[product].price;
//       const image = cart[product].image;
//       const description = cart[product].description;

//       totalAmount += quantity * price;

//       const listItem = document.createElement("li");
//       listItem.innerHTML = `
//               <img src="${image}" alt="${product}" width="50" height="50">
//               <span>${product}</span>
//               <p>${description}</p>
//               <p>Price: $${price}</p>
//               <button onclick="removeFromCart('${product}')">Remove</button>
//               <input type="number" value="${quantity}" min="1" onchange="updateQuantity('${product}', this.value)">
//           `;

//       cartList.appendChild(listItem);
//     }
//   }

//   // Update the total amount
//   totalAmountElement.textContent = totalAmount.toFixed(2);
// }

// function removeFromCart(productName) {
//   let cart = JSON.parse(localStorage.getItem("cart")) || {};
//   delete cart[productName];
//   localStorage.setItem("cart", JSON.stringify(cart));
//   updateCart();
// }

// function updateQuantity(productName, newQuantity) {
//   let cart = JSON.parse(localStorage.getItem("cart")) || {};
//   cart[productName].quantity = parseInt(newQuantity);
//   localStorage.setItem("cart", JSON.stringify(cart));
//   updateCart();
// }z

// // Call the updateCart function to populate the cart list when the page loads
// updateCart();

// Function to set cart data in localStorage
function setCartData(cartData) {
  localStorage.setItem("cart", JSON.stringify(cartData));
}

// Function to get cart data from localStorage
function getCartData() {
  return JSON.parse(localStorage.getItem("cart")) || {};
}

// Function to add a product to the cart
function addToCart(
  productName,
  productPrice,
  productImage,
  productDescription
) {
  let cart = getCartData();

  if (cart[productName]) {
    cart[productName].quantity++;
  } else {
    cart[productName] = {
      quantity: 1,
      price: productPrice,
      image: productImage,
      description: productDescription,
    };
  }

  setCartData(cart);

  updateCartCount();

  alert(productName + " has been added to the cart");
}

// Function to update the cart count badge
function updateCartCount() {
  let cart = getCartData();
  let cartCount = 0;

  for (let product in cart) {
    if (cart.hasOwnProperty(product)) {
      cartCount += cart[product].quantity;
    }
  }

  document.getElementById("cartCount").textContent = cartCount;
}

// Call updateCartCount() on page load to set the cart count from the cart data in localStorage
updateCartCount();

// Function to update the cart list in cart.html
function updateCart() {
  let cart = getCartData();
  let cartList = document.getElementById("cartList");
  let totalAmountElement = document.getElementById("totalAmount");
  let totalAmount = 0.0;

  // Clear the cart list
  cartList.innerHTML = "";

  // Populate the cart list with items from the cart object
  for (let product in cart) {
    if (cart.hasOwnProperty(product)) {
      const quantity = cart[product].quantity;
      const price = cart[product].price;
      const image = cart[product].image;
      const description = cart[product].description;

      totalAmount += quantity * price;

      const listItem = document.createElement("li");
      listItem.innerHTML = `
        <img src="${image}" alt="${product}" width="50" height="50">
        <span>${product}</span>
        <p>${description}</p>
        <p>Price: ₦${price}</p>
        <button onclick="removeFromCart('${product}')">Remove</button>
        <input type="number" value="${quantity}" min="1" onchange="updateQuantity('${product}', this.value)">
      `;

      cartList.appendChild(listItem);
    }
  }

  // Update the total amount
  totalAmountElement.textContent = totalAmount.toFixed(2);
}

// Function to remove a product from the cart
function removeFromCart(productName) {
  let cart = getCartData();
  delete cart[productName];
  setCartData(cart);
  updateCart();
}

// Function to update the quantity of a product in the cart
function updateQuantity(productName, newQuantity) {
  let cart = getCartData();
  cart[productName].quantity = parseInt(newQuantity);
  setCartData(cart);
  updateCart();
}

// Function to clear the cart data in localStorage
function clearCart() {
  localStorage.removeItem("cart");
  updateCartCount();
}

// Call the updateCart function to populate the cart list when the cart.html page loads
updateCart();

function subscribe() {
  const emailInput = document.querySelector("input[type='email']").value;

  // Basic email validation
  if (!isValidEmail(emailInput)) {
    alert("Please enter a valid email address.");
    return;
  }

  // Subscription success
  console.log("Subscribed email:", emailInput);
  alert("Subscription successful!");

  emailInput.value = "";
}

function isValidEmail(email) {
  // Basic email validation using a regular expression
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function updateCart() {
  let cart = JSON.parse(localStorage.getItem("cart")) || {};
  let cartList = document.getElementById("cartList");
  let totalAmountElement = document.getElementById("totalAmount");
  let totalAmount = 0.0;

  // Clear the cart list
  cartList.innerHTML = "";

  // Populate the cart list with items from the cart object
  for (let product in cart) {
    if (cart.hasOwnProperty(product)) {
      const quantity = cart[product].quantity;
      const price = cart[product].price;
      const image = cart[product].image;
      const description = cart[product].description;

      totalAmount += quantity * price;

      const listItem = document.createElement("li");
      listItem.innerHTML = `
                        <img src="${image}" alt="${product}" width="50" height="50">
                        <span>${product}</span>
                        <p>${description}</p>
                        <p>Price: ₦${price}</p>
                        <button onclick="removeFromCart('${product}')">Remove</button>
                        <input type="number" value="${quantity}" min="1" onchange="updateQuantity('${product}', this.value)">
                    `;

      cartList.appendChild(listItem);
    }
  }

  // Update the total amount
  totalAmountElement.textContent = totalAmount.toFixed(2);
}

function removeFromCart(productName) {
  let cart = JSON.parse(localStorage.getItem("cart")) || {};
  delete cart[productName];
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCart();
}

function updateQuantity(productName, newQuantity) {
  let cart = JSON.parse(localStorage.getItem("cart")) || {};
  cart[productName].quantity = parseInt(newQuantity);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCart();
}

// Call the updateCart function to populate the cart list when the page loads
updateCart();
