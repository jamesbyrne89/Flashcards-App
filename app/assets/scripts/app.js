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

addCategoryBtn.addEventListener('click', function(){alert('Add a category')});



   //  Function for creating a new category. Should produce an object 
   //  
   //  
function createNewCategory(input){

var categoryTemplate = {
  name: input,
  cards: 'blank',// an array of cards,
  addCard: function (){
    
  }

}

let category = Object.create(category.prototype);
newCategory.
categories.push(newCategory);

//return categories;
}
 
const groupAllCards = () => {
 var allCategories = [];
}


