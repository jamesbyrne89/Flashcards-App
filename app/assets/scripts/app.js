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
		opacity: 0.95
	});
	tl2.to(menu2, 0.1, {
		display: 'flex'
	}).to(menu2, 0.1, {
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

	menuTransition();
	menuOverlay.appendChild(menu3);
	menu3.classList.add('menu');
	menu3.classList.add('hidden');
	menu3.id = 'addCategoryMenu';
	menu3.innerHTML = `<ul class="add-category-menu">
  <h2 class="menu__header">Categories</h2>
    <label for="add-category">Add a new category:
     <form>
     <input type="text" name="add-category" id="addCategoryInput" class="add-category__input" autofocus>
     </form>
     <input type="submit" class="btn-submit">Add</input>
    </ul>`;
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


}

const newCategoryInput = document.getElementById('addCategoryInput');

newCategoryInput.addEventListener = document.getElementById('submit', function(e) {
	if (newCategoryInput.value) {
		AddCategory(newCategoryInput.value);
		storeFlashcards();
	};
	else return;
});

// On click, add a new category



//  Function for creating a new category. Should produce an object 

function AddCategory(input) {
	this.name = input;
	this.cards = [];
	// Code to add a new flashcard
}

// Add to localStorage

function storeFlashcards() {

	var allFlashcards = JSON.parse(localStorage.getItem('itemsArray')) || [];

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