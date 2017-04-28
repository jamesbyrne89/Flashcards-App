// Declare global variables

const menuBtn = document.getElementById('menu-btn');
const addCategoryBtn = document.getElementById('addCategory');
const menuOverlay = document.getElementById('menu-overlay');

menuBtn.addEventListener('click', showMenu);
menuOverlay.addEventListener('click', hideMenu, false);
addCategoryBtn.addEventListener('click', function(e) {

	e.stopPropagation();
	showCategoryInput();

});


const menu = document.getElementById('main-menu');
const menu2 = document.getElementById('secondary-menu');
const menu3 = document.getElementById('tertiary-menu-one');
const line1 = document.getElementById('vert-line-1');
const line2 = document.getElementById('vert-line-2');
const menuBar1 = document.getElementById('menu-bar-one');
const menuBar2 = document.getElementById('menu-bar-two');
const menuBar3 = document.getElementById('menu-bar-three');
const backBtn = document.getElementById('backBtn');
const newCategoryInput = document.getElementById('addCategoryInput');

function showMenu() {

	const tl = new TimelineLite();
	const tl2 = new TimelineLite();

	tl.to(menuOverlay, 0, {
		display: 'flex',
		opacity: 0.95
	}).to(menu, 0.1, {
		display: 'flex'
	}).to(menu, 0.5, {
		y: -15,
		opacity: 0.95
	});
	tl2.to(menu2, 0.1, {
		display: 'flex'
	}).to(menu2, 0.1, {
		y: -15,
		opacity: 0.95
	});
	TweenLite.to(line1, 0.7, {
		height: '100vh'
	});
	TweenLite.to(line2, 0.7, {
		height: '100vh',
		delay: 0.5
	});

	TweenLite.to(menuBarOne, 0.5, {
		width: '0px',
		delay: 0.4
	});
	TweenLite.to(menuBarTwo, 0.5, {
		width: '0px',
		delay: 0.2
	});
	TweenLite.to(menuBarThree, 0.5, {
		width: '0px'
	});

}

function hideMenu() {
	const tl = new TimelineLite();
	const tl2 = new TimelineLite();
	const tl3 = new TimelineLite();
	const addCategoryMenu = document.getElementById("add-category-menu");

	tl.to(menu, 0.1, {
		opacity: 0
	}).to(menu, 0, {
		display: 'none'
	}).to(menuOverlay, 1, {
		opacity: 0
	}).to(menuOverlay, 0, {
		display: 'none'
	})
	tl2.to(menu2, 0.1, {
		opacity: 0
	}).to(menu2, 0, {
		display: 'none'
	});
	if (menu3 !== '') {

		tl3.to(menu3, 0.1, {
			opacity: 0
		}).to(menu3, 0, {
			display: 'none'
		});
	}
	TweenLite.to(line1, 0.3, {
		height: '0px',
		x: 0
	});
	TweenLite.to(line2, 0.3, {
		height: '0px',
		delay: 0.2
	});

	TweenLite.to(menuBarOne, 0.5, {
		width: '100%',
		delay: 0.4
	});
	TweenLite.to(menuBarTwo, 0.5, {
		width: '100%',
		delay: 0.2
	});
	TweenLite.to(menuBarThree, 0.5, {
		width: '100%'
	});
}

function menuTransition() {

	const slider = document.createElement('div');
	const tl = new TimelineLite();

	slider.classList.add('menu-transition');
	document.body.appendChild(slider);

	tl.to(slider, 0.5, {
			width: '100vw'
		})
		.to(slider, 0.7, {
			opacity: 0,
			delay: 0.3
		})
		.to(slider, 0, {
			display: 'none'
		});
	TweenLite.to(line1, 0.2, {
		height: '0',
		display: 'none'
	});
	TweenLite.to(line2, 0.2, {
		height: '0',
		display: 'none'
	});
	TweenLite.to(menu, 0, {
		display: 'none'
	});
	TweenLite.to(menu2, 0, {
		display: 'none'
	});
}

function showCategoryInput() {

	const tl = new TimelineLite();
	const addCategoryMenu = document.getElementById("add-category-menu");

	menuTransition();


	//input.setAttribute('onsubmit', 'event.preventDefault();');



	backBtn.addEventListener('click', function(e) {
		TweenLite.to(addCategoryMenuEl, 0, {
			display: 'none'
		});
		menuTransition();
		showMenu();
	})

	tl.to(menu3, 0, {
			display: 'flex'
		})
		.to(menu3, 0.3, {
			opacity: 1,
			delay: 1.4
		});
	// Fade out main menu
	TweenLite.to(line1, 0.7, {
		display: 'inline-block',
		height: '100vh',
		delay: 1.2
	});

	menu3.addEventListener('click', function(e) {
		e.stopPropagation();
	});



	//function submitcategoryForm(cat) {

	//	var text = cat.value;

	// Check to make sure the text is not blank (or just spaces).
	//	if (text.replace(/ /g, '') != '') {
	// Create the category object.
	//		fcDB.createCategory(text, function(flashcard) {

	//			addNewCategory();
	//		});
	//	}

	// Reset the input field.
	//	newCategoryInput.value = '';

	// Don't send the form.
	//	return false;

	//	(function confirm() {

	//		const confirmation = document.createElement('span');

	//		confirmation.setAttribute('class', 'add-category__confirmation');
	//		confirmation.innerText = `${cat.value} category successfully added`;
	//		addCategoryMenuEl.appendChild(confirmation);
	//		console.log(confirmation)
	//		TweenLite.to(confirmation, 1, {
	//			y: -15,
	//			opacity: 1,
	//			ease: Power1.easeOut
	//		});
	//	})();

	//	cat.value = "";
	//}
};



// On click, add a new category



//  Function for creating a new category. Should produce an object 

function AddCategory(input) {
	this.catName = input;
	this.cards = [];

	return this.catName;
	// Code to add a new flashcard
}



// Add a new card to the deck
function AddCard(textInput) {
	this.content = textInput;
	this.addToDOM = function() {
		const newCard = document.createElement(div);
		newCard.classList.add('card');
	}
}

// Search through the array of categories and add the card to the cards array within the category object



/**
 * Code to create the database that will store the decks
 */

var flashcardsDB = (function() {
	var flashcardsDB = {};
	var datastore = null;

	// flashcards: Add methods for interacting with the database here.

	// Export the tDB object.
	return flashcardsDB;
}());


var db;

flashcardsDB.indexedDBOk = function() {
	return "indexedDB" in window;
}

document.addEventListener("DOMContentLoaded", function() {

	//No support? Go in the corner and pout.
	if (!flashcardsDB.indexedDBOk) return;

	var openRequest = indexedDB.open("idarticle_categories", 1);

	openRequest.onupgradeneeded = function(e) {
		var thisDB = e.target.result;

		if (!thisDB.objectStoreNames.contains("categories")) {
			thisDB.createObjectStore("categories", {autoIncrement:true});
			//I want to be able to search categories by name later
			os.createIndex("categoryNames", "name", {unique:false});		
		}
	}

	openRequest.onsuccess = function(e) {
		console.log("running onsuccess");

		db = e.target.result;

		//Listen for add clicks
		console.log('added event listener')

		newCategoryInput.onkeyup = function(e) {

			if (e.keyCode == 13 && newCategoryInput.value !== "") {
				flashcardsDB.addNewCategory()

			}
		}
	}

	openRequest.onerror = function(e) {
		//Do something for the error
	}


}, false);

flashcardsDB.addNewCategory = function(e) {
	var name = newCategoryInput.value;

	console.log("About to add " + name);

	var transaction = db.transaction(["categories"], "readwrite");
	var store = transaction.objectStore("categories");

	//Define a category object
	var category = {
		name: name,
		created: 'new'
	}

	//Perform the add
	var request = store.add(category);

	request.onerror = function(e) {
		console.log("Error", e.target.error.name);
		//some type of error handler
	}

	request.onsuccess = function(e) {
		console.log("Woot! Did it");
	}
}

// Get all cards in the database (not filtered)
function getCards(e) {
    var transaction = db.transaction("categories", IDBTransaction.READ_ONLY);
    var store = transaction.objectStore("categories");
    var items = [];
 
    transaction.oncomplete = function(evt) {  
        callback(items);
    };
 
    var cursorRequest = store.openCursor();
 
    cursorRequest.onerror = function(error) {
        console.log(error);
    };
 
    cursorRequest.onsuccess = function(evt) {                    
        var cursor = evt.target.result;
        if (cursor) {
            items.push(cursor.value);
            cursor.continue();
        }
        console.log(items)
    };
}

const addButton = document.getElementById('addButton');
addButton.addEventListener('click', getCards);

