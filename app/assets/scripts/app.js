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
	const menu2 = document.getElementById('secondary-menu');
	const line1 = document.getElementById('vert-line-1');
	const line2 = document.getElementById('vert-line-2');
	const menuBar1 = document.getElementById('menu-bar-one');
	const menuBar2 = document.getElementById('menu-bar-two');
	const menuBar3 = document.getElementById('menu-bar-three');
	const tl = new TimelineLite();
	const tl2 = new TimelineLite();

tl.to(menuOverlay, 0, {display: 'flex', opacity: 0.95}).to(menu, 0.1, {display: 'flex'}).to(menu, 0.5, {opacity: 0.95});
tl2.to(menu2, 0.1, {display: 'flex'}).to(menu2, 0.1, {opacity: 0.95});
TweenLite.to(line1, 0.7, {height: '100vh'});
TweenLite.to(line2, 0.7, {height: '100vh', delay: 0.5});

TweenLite.to(menuBarOne, 0.5, {width: '0px', delay: 0.4});
TweenLite.to(menuBarTwo, 0.5, {width: '0px', delay: 0.2});
TweenLite.to(menuBarThree, 0.5, {width: '0px'});

}

function hideMenu () {
	const menu = document.getElementById('main-menu');
	const menu2 = document.getElementById('secondary-menu');
	const line1 = document.getElementById('vert-line-1');
	const line2 = document.getElementById('vert-line-2');
	const menuBar1 = document.getElementById('menu-bar-one');
	const menuBar2 = document.getElementById('menu-bar-two');
	const menuBar3 = document.getElementById('menu-bar-three');	
	const tl = new TimelineLite();
	const tl2 = new TimelineLite();

	tl.to(menu, 0.1, {opacity: 0}).to(menu, 0, {display: 'none'}).to(menuOverlay, 1, {opacity: 0}).to(menuOverlay, 0, {display: 'none'})
	tl2.to(menu2, 0.1, {opacity: 0}).to(menu2, 0, {display: 'none'});
TweenLite.to(line1, 0.3, {height: '0px'});
TweenLite.to(line2, 0.3, {height: '0px', delay: 0.2});

TweenLite.to(menuBarOne, 0.5, {width: '100%', delay: 0.4});
TweenLite.to(menuBarTwo, 0.5, {width: '100%', delay: 0.2});
TweenLite.to(menuBarThree, 0.5, {width: '100%'});
}

   // On click, add a new category
   



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


 

