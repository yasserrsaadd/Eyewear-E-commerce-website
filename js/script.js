// open cart modal
const cart = document.querySelector('#cart');
const cartModalOverlay = document.querySelector('.cart-modal-overlay');

cart.addEventListener('click', () => {
  if (cartModalOverlay.style.transform === 'translateX(-200%)'){
    cartModalOverlay.style.transform = 'translateX(0)';
  } else {
    cartModalOverlay.style.transform = 'translateX(-200%)';
  }
})
// end of open cart modal

// close cart modal
const closeBtn = document.querySelector ('#close-btn');

closeBtn.addEventListener('click', () => {
  cartModalOverlay.style.transform = 'translateX(-200%)';
});

cartModalOverlay.addEventListener('click', (e) => {
  if (e.target.classList.contains('cart-modal-overlay')){
    cartModalOverlay.style.transform = 'translateX(-200%)'
  }
})
// end of close cart modal

// add products to cart
const addToCart = document.getElementsByClassName('add-to-cart');
const productRow = document.getElementsByClassName('product-row');

for (var i = 0; i < addToCart.length; i++) {
  button = addToCart[i];
  button.addEventListener('click', addToCartClicked)
}

function addToCartClicked (event) {
  button = event.target;
  var cartItem = button.parentElement;
  var price = cartItem.getElementsByClassName('product-price')[0].innerText;
  var productTitle = cartItem.getElementsByClassName('product-title')[0].innerText;
  
  var imageSrc = cartItem.getElementsByClassName('product-image')[0].src;
  addItemToCart (price, imageSrc, productTitle);
  updateCartPrice()
}

function addItemToCart (price, imageSrc, productTitle) {
  var productRow = document.createElement('div');
  productRow.classList.add('product-row');
  var productRows = document.getElementsByClassName('product-rows')[0];
  var cartImage = document.getElementsByClassName('cart-image');
  
  for (var i = 0; i < cartImage.length; i++){
    if (cartImage[i].src == imageSrc){
      alert ('This item has already been added to the cart')
      return;
    }
  }
  
  var cartRowItems = `
  <div class="product-row">
        <h5 class="product-title">${productTitle}</h5>
        <img class="cart-image" src="${imageSrc}" alt="">
        <span class ="cart-price">${price}</span>
        <input class="product-quantity" type="number" value="1">
        <button class="remove-btn">Remove</button>
        </div>
        
      `
  productRow.innerHTML = cartRowItems;
  productRows.append(productRow);
  productRow.getElementsByClassName('remove-btn')[0].addEventListener('click', removeItem)
  productRow.getElementsByClassName('product-quantity')[0].addEventListener('change', changeQuantity)
  updateCartPrice()
}
// end of add products to cart

// Remove products from cart
const removeBtn = document.getElementsByClassName('remove-btn');
for (var i = 0; i < removeBtn.length; i++) {
  button = removeBtn[i]
  button.addEventListener('click', removeItem)
}

function removeItem (event) {
  btnClicked = event.target
  btnClicked.parentElement.parentElement.remove()
  updateCartPrice()
}

// update quantity input
var quantityInput = document.getElementsByClassName('product-quantity')[0];

for (var i = 0; i < quantityInput; i++){
  input = quantityInput[i]
  input.addEventListener('change', changeQuantity)
}

function changeQuantity(event) {
  var input = event.target
  if (isNaN(input.value) || input.value <= 0){
    input.value = 1
  }
  updateCartPrice()
}
// end of update quantity input

// update total price
function updateCartPrice() {
  var total = 0
  for (var i = 0; i < productRow.length; i += 2) {
    cartRow = productRow[i]
  var priceElement = cartRow.getElementsByClassName('cart-price')[0]
  var quantityElement = cartRow.getElementsByClassName('product-quantity')[0]
  var price = parseFloat(priceElement.innerText.replace('$', ''))
  var quantity = quantityElement.value
  total = total + (price * quantity )
    
  }
  document.getElementsByClassName('total-price')[0].innerText =  '$' + total

document.getElementsByClassName('cart-quantity')[0].textContent = i /= 2
}
// end of update total price

// purchase items
const purchaseBtn = document.querySelector('.purchase-btn');

const closeCartModal = document.querySelector('.cart-modal');

purchaseBtn.addEventListener('click', purchaseBtnClicked)

function purchaseBtnClicked () {
  alert ('Thank you for your purchase');
  cartModalOverlay.style.transform= 'translateX(-100%)'
 var cartItems = document.getElementsByClassName('product-rows')[0]
 while (cartItems.hasChildNodes()) {
   cartItems.removeChild(cartItems.firstChild)
   
 }
  updateCartPrice()
}

// end of purchase items
// Select the view button for all products
const viewButtons = document.querySelectorAll('.view-button');

// Add event listener to each view button
viewButtons.forEach(button => {
  button.addEventListener('click', function() {
    // Get the product details from the clicked product card
    const productTitle = this.closest('.card').querySelector('.product-title').textContent;
    const productImage = this.closest('.card').querySelector('.product-image').src;
    const productPrice = this.closest('.card').querySelector('.product-price').textContent;

    // Create product details HTML
    const productDetailsHTML = `
      <h2>${productTitle}</h2>
      <img src="${productImage}" alt="${productTitle}">
      <p>Price: ${productPrice}</p>
    `;

    // Display the product details in the modal
    document.getElementById('productDetailsContent').innerHTML = productDetailsHTML;

    // Show the modal
    document.getElementById('productDetailsModal').style.display = 'block';
  });
});

// Close the modal when the close button is clicked
document.querySelector('.close').addEventListener('click', function() {
  document.getElementById('productDetailsModal').style.display = 'none';
});




document.addEventListener("DOMContentLoaded", function() {
  const searchInput = document.getElementById('searchInput');
  const products = document.getElementById('products');
  const allProducts = document.querySelectorAll('.card'); // Select all product cards

  // Add event listener for input event on search input
  searchInput.addEventListener('input', function() {
      const searchTerm = searchInput.value.trim().toLowerCase();

      // Filter products based on search term
      allProducts.forEach(product => {
          const productTitle = product.querySelector('.product-title').textContent.toLowerCase();
          if (productTitle.includes(searchTerm)) {
              product.style.display = 'block'; // Show matching products
          } else {
              product.style.display = 'none'; // Hide non-matching products
          }
      });

      // If search input is empty, display all products
      if (searchTerm === '') {
          allProducts.forEach(product => {
              product.style.display = 'block';
          });
      }
  });
});










window.addE


// Params
let mainSliderSelector = '.main-slider',
    navSliderSelector = '.nav-slider',
    interleaveOffset = 0.5;

// Main Slider
let mainSliderOptions = {
      loop: true,
      speed:1000,
      autoplay:{
        delay:3000
      },
      loopAdditionalSlides: 10,
      grabCursor: true,
      watchSlidesProgress: true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      on: {
        init: function(){
          this.autoplay.stop();
        },
        imagesReady: function(){
          this.el.classList.remove('loading');
          this.autoplay.start();
        },
        slideChangeTransitionEnd: function(){
          let swiper = this,
              captions = swiper.el.querySelectorAll('.caption');
          for (let i = 0; i < captions.length; ++i) {
            captions[i].classList.remove('show');
          }
          swiper.slides[swiper.activeIndex].querySelector('.caption').classList.add('show');
        },
        progress: function(){
          let swiper = this;
          for (let i = 0; i < swiper.slides.length; i++) {
            let slideProgress = swiper.slides[i].progress,
                innerOffset = swiper.width * interleaveOffset,
                innerTranslate = slideProgress * innerOffset;
           
            swiper.slides[i].querySelector(".slide-bgimg").style.transform =
              "translateX(" + innerTranslate + "px)";
          }
        },
        touchStart: function() {
          let swiper = this;
          for (let i = 0; i < swiper.slides.length; i++) {
            swiper.slides[i].style.transition = "";
          }
        },
        setTransition: function(speed) {
          let swiper = this;
          for (let i = 0; i < swiper.slides.length; i++) {
            swiper.slides[i].style.transition = speed + "ms";
            swiper.slides[i].querySelector(".slide-bgimg").style.transition =
              speed + "ms";
          }
        }
      }
    };
let mainSlider = new Swiper(mainSliderSelector, mainSliderOptions);

// Navigation Slider
let navSliderOptions = {
      loop: true,
      loopAdditionalSlides: 10,
      speed:1000,
      spaceBetween: 5,
      slidesPerView: 5,
      centeredSlides : true,
      touchRatio: 0.2,
      slideToClickedSlide: true,
      direction: 'vertical',
      on: {
        imagesReady: function(){
          this.el.classList.remove('loading');
        },
        click: function(){
          mainSlider.autoplay.stop();
        }
      }
    };
let navSlider = new Swiper(navSliderSelector, navSliderOptions);

// Matching sliders
mainSlider.controller.control = navSlider;
navSlider.controller.control = mainSlider;










document.addEventListener("DOMContentLoaded", function() {
  const favoritesIcon = document.getElementById('favoritesIcon');
  const favoritesContainer = document.querySelector('.favorites-container');
  const favoritesList = document.getElementById('favoritesList');

  // Function to add a product to favorites
function addToFavorites(productTitle, productImage, productPrice) {
  
    // Check if the product already exists in favorites
    const existingItem = Array.from(favoritesList.querySelectorAll('.favorite-item')).find(item => {
        return item.querySelector('h4').textContent === productTitle;
    });

    // If the product does not exist, add it to favorites
    if (!existingItem) {
        const listItem = document.createElement('li');
        listItem.classList.add('favorite-item');
        listItem.innerHTML = `
            <div class="favorite-item">
                <img src="${productImage}" alt="${productTitle}">
                <div class="favorite-details">
                    <h4>${productTitle}</h4>
                    <span>${productPrice}</span>
                    <button class="remove-from-favorites">Remove</button>
                </div>
            </div>
        `;
        
        favoritesList.appendChild(listItem);

        // Attach event listener to the remove button
        const removeButton = listItem.querySelector('.remove-from-favorites');
        removeButton.addEventListener('click', function() {
            listItem.remove(); // Remove the item from the favorites list
            updateLocalStorage(); // Update local storage after removal
        });

        updateLocalStorage(); // Update local storage after addition
    }

    
}



  // Function to update local storage with current favorites list
  function updateLocalStorage() {
      const favoritesItems = Array.from(favoritesList.querySelectorAll('.favorite-item')).map(item => {
          return {
              title: item.querySelector('h4').textContent,
              image: item.querySelector('img').src,
              price: item.querySelector('span').textContent
          };
      });
      localStorage.setItem('favorites', JSON.stringify(favoritesItems));
  }

  // Load favorites from local storage when the page loads
  function loadFavoritesFromLocalStorage() {
      const favoritesItems = JSON.parse(localStorage.getItem('favorites'));
      if (favoritesItems) {
          favoritesItems.forEach(item => {
              addToFavorites(item.title, item.image, item.price);
          });
      }
  }

  loadFavoritesFromLocalStorage(); // Load favorites from local storage

  favoritesIcon.addEventListener('click', function() {
      // Toggle the visibility of the favorites container
      if (favoritesContainer.style.display === 'none') {
          favoritesContainer.style.display = 'block';
      } else {
          favoritesContainer.style.display = 'none';
      }
  });

  // Add event listeners to "Add to Favorites" buttons for each product
  const addToFavoritesButtons = document.querySelectorAll('.add-to-favorites');
  addToFavoritesButtons.forEach(button => {
      button.addEventListener('click', function() {
          const productCard = this.closest('.card');
          const productTitle = productCard.querySelector('.product-title').textContent;
          const productImage = productCard.querySelector('.product-image').src;
          const productPrice = productCard.querySelector('.product-price').textContent;
          addToFavorites(productTitle, productImage, productPrice);
      });
  });

  // Clear favorites list when the page is about to unload
  window.addEventListener('beforeunload', function() {
      favoritesList.innerHTML = ''; // Clear favorites list in the DOM
  });
});


function toggleHeartColor(button) {
  var heartIcon = button.querySelector('.fa-heart');
  heartIcon.style.color = '#ff0000'; // Change color to red

  // Revert color back to grey after 1000 milliseconds (1 second)
  setTimeout(function() {
      heartIcon.style.color = '#8a8a8a';
  }, 1000);
}


