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
const menu3 = document.createElement('nav');
const line1 = document.getElementById('vert-line-1');
const line2 = document.getElementById('vert-line-2');
const menuBar1 = document.getElementById('menu-bar-one');
const menuBar2 = document.getElementById('menu-bar-two');
const menuBar3 = document.getElementById('menu-bar-three');

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
		height: '0'
	});
	TweenLite.to(line2, 0.2, {
		height: '0'
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

	const addCategoryMenuEl = document.createElement('ul');
	const inputHolder = document.createDocumentFragment();
	const backBtn = document.createElement('button');
	const header = document.createElement('h2');
	const label = document.createElement('label');
	const input = document.createElement('input');
	const submit = document.createElement('input');


	menuTransition();

	addCategoryMenuEl.setAttribute('class', 'add-category-menu');


	header.innerText = 'Categories';
	header.setAttribute('class', 'menu__header');

	backBtn.innerHTML = '<i class="btn-back-arrow fa fa-long-arrow-left" aria-hidden="true"></i> Back to menu'
	backBtn.setAttribute('class', 'menu__back-btn');
	backBtn.setAttribute('id', 'backBtn');

	label.setAttribute('for', 'add-category');
	label.setAttribute('class', 'add-category__label');
	label.innerText = 'Add a new category:';

	input.setAttribute('name', 'add-category');
	input.setAttribute('class', 'add-category__input');
	input.setAttribute('id', 'addCategoryInput');

	submit.setAttribute('type', 'submit');
	submit.setAttribute('class', 'btn-submit');
	submit.setAttribute('id', 'submitBtn');
	//input.setAttribute('onsubmit', 'event.preventDefault();');

	inputHolder.appendChild(backBtn);
	inputHolder.appendChild(label);
	inputHolder.appendChild(input);
	inputHolder.appendChild(submit);
	addCategoryMenuEl.appendChild(header);
	addCategoryMenuEl.appendChild(inputHolder);

	menuOverlay.appendChild(menu3);
	menu3.classList.add('menu');
	menu3.classList.add('hidden');
	menu3.id = 'addCategoryMenu';
	menu3.appendChild(addCategoryMenuEl);

const backBtnEl = document.getElementById('backBtn');

backBtnEl.addEventListener('click', function(e){
	TweenLite.to(addCategoryMenuEl, 0, {display: 'none'});
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
		height: '100vh',
		delay: 1.2
	});

	menu3.addEventListener('click', function(e) {
		e.stopPropagation();
	});


	document.body.onkeyup = function(e) {
		const newCategoryInput = document.getElementById('addCategoryInput');
		if (e.keyCode == 13 && newCategoryInput.value !== "") {
			submitcategoryForm(newCategoryInput);
		} else {
			return
		}
	}

	function submitcategoryForm(cat) {

  var text = cat.value;

  // Check to make sure the text is not blank (or just spaces).
  if (text.replace(/ /g,'') != '') {
    // Create the todo item.
    fcDB.createTodo(text, function(flashcard) {
      refreshFlashcards();
    });
  }

  // Reset the input field.
  newTodoInput.value = '';

  // Don't send the form.
  return false;

		(function confirm() {

			const confirmation = document.createElement('span');

			confirmation.setAttribute('class', 'add-category__confirmation');
			confirmation.innerText = `${cat.value} category successfully added`;
			addCategoryMenuEl.appendChild(confirmation);
			console.log(confirmation)
			TweenLite.to(confirmation, 1, {
				y: -15,
				opacity: 1,
				ease: Power1.easeOut
			});
		})();

		cat.value = "";
	}
};



// On click, add a new category



//  Function for creating a new category. Should produce an object 

function AddCategory(input) {
	this.catName = input;
	this.cards = [];

	return this.catName;
	// Code to add a new flashcard
}

// Add to localStorage

function storeFlashcards() {

	const allFlashcards = JSON.parse(localStorage.getItem('itemsArray')) || [];

	allFlashcards.push(newObj);
	localStorage.setItem('itemsArray', JSON.stringify(allFlashcards));
};

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

const flashcardsDB = (function() {
	const fcDB = {};
	const datastore = null;

	// TODO: Add methods for interacting with the database here.

	// Export the fcDB object.
	return fcDB;
}());

/**
 * Open a connection to the datastore.
 */
fcDB.open = function(callback) {
		// Database version.
		const version = 1;

		// Open a connection to the datastore.
		const request = indexedDB.open('flashcards', version);

		// Handle datastore upgrades.
		request.onupgradeneeded = function(e) {
			const db = e.target.result;

			e.target.transaction.onerror = fcDB.onerror;

			// Delete the old datastore.
			if (db.objectStoreNames.contains('flashcard')) {
				db.deleteObjectStore('flashcard');
			}

			// Create a new datastore.
			const store = db.createObjectStore('flashcard', {
				keyPath: 'timestamp'
			});
		};

		// Handle successful datastore access.
		request.onsuccess = function(e) {
			// Get a reference to the DB.
			datastore = e.target.result;

			// Execute the callback.
			callback();
		};

		/**
		 * Fetch all of the items in the datastore.
		 */
		fcDB.fetchflashcards = function(callback) {
			var db = datastore;
			var transaction = db.transaction(['flashcard'], 'readwrite');
			var objStore = transaction.objectStore('flashcard');

			var keyRange = IDBKeyRange.lowerBound(0);
			var cursorRequest = objStore.openCursor(keyRange);

			var flashcards = [];

			transaction.oncomplete = function(e) {
				// Execute the callback function.
				callback(flashcards);
			};

			cursorRequest.onsuccess = function(e) {
				var result = e.target.result;

				if (!!result == false) {
					return;
				}

				flashcards.push(result.value);

				result.continue();
			};

			cursorRequest.onerror = fcDB.onerror;
		};
	/**
 * Delete a todo item.
 */
tDB.deleteTodo = function(id, callback) {
  var db = datastore;
  var transaction = db.transaction(['todo'], 'readwrite');
  var objStore = transaction.objectStore('todo');

  var request = objStore.delete(id);

  request.onsuccess = function(e) {
    callback();
  }

  request.onerror = function(e) {
    console.log(e);
  }
};





// Handle new todo item form submissions.
newTodoForm.onsubmit = function() {
  // Get the todo text.

};