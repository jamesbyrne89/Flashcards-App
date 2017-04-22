  // Initialize collapse button
  $(".button-collapse").sideNav();
  // Initialize collapsible (uncomment the line below if you use the dropdown variation)
  //$('.collapsible').collapsible();

    $('.button-collapse').sideNav({
      menuWidth: 300, // Default is 300
      edge: 'left', // Choose the horizontal origin
      closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
      draggable: true // Choose whether you can drag to open on touch screens
    }
  );

      $(document).ready(function(){
    // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
    $('.modal').modal();
  });

// Accordion

  $(document).ready(function(){
    $('.collapsible').collapsible();
    $('.collapsible-header').addClass('.collapsible-header--expanded');
  });



const menuBtn = document.getElementById('menu-btn');
const menuOverlay = document.getElementById('menu-overlay');

menuBtn.addEventListener('click', showMenu);
menuOverlay.addEventListener('click', hideMenu);


function showMenu () {
	const menu = document.getElementById('main-menu');
	const tl = new TimelineLite();
tl.to(menu, 0.1, {display: 'flex'}).to(menu, 0.1, {opacity: 0.95});
$('.menu-overlay').fadeIn('5000');
const line = document.getElementById('vert-line');
TweenLite.to(line, 0.7, {height: '100vh'});
}

function hideMenu () {
	const menu = document.getElementById('main-menu');
	const tl = new TimelineLite();
	tl.to(menu, 0.7, {opacity: 0}).to(menu, 5, {display: 'none'});
$('.menu-overlay').fadeOut('1000');
const line = document.getElementById('vert-line');
TweenLite.to(line, 0.7, {height: '0px'});
}

   // On click, add a new category
   
const addCategoryBtn = document.getElementById('add-category-btn');

addCategoryBtn.addEventListener('click', AddCategory);



   //  Function for creating a new category. Should produce an object 

function AddCategory(input){
  this.name = input;
  this.cards = [];
    // Code to add a new flashcard
  }

// Add to localStorage

function storeFlashcards (){

var allFlashcards = JSON.parse(localStorage.getItem('itemsArray')) || [];

allFlashcards.push(newObj);
localStorage.setItem('itemsArray', JSON.stringify(allFlashcards));
};

// Add a new card to the deck
function AddCard (textInput){
  this.content = textInput;
  this.addToDOM = function () {
    const newCard = document.createElement(div);
    newCard.classList.add('card');
  }
}

// Search through the array of categories and add the card to the cards array within the category object


 

