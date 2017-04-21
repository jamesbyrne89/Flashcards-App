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


   // On click, add a new category
   
const addCategoryBtn = document.getElementById('add-category-btn');

addCategoryBtn.addEventListener('click', AddCategory});



   //  Function for creating a new category. Should produce an object 

function AddCategory(input){
  this.name = input;
  this.cards = [];
    // Code to add a new flashcard
  }

// Add to localStorage

function storeFlashcards (){

var allFlashcards = JSON.parse(localStorage.getItem('itemsArray')) || [];
var newObj = ;
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


 

