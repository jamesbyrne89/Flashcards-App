'use strict';

(function init() {

	// Declare global variables


	var body = document.getElementById('body');
	var menuBtn = document.getElementById('menu-btn');
	var addCategoryBtn = document.getElementById('addCategory');
	var addCardBtn = document.getElementById('addCard');
	var submitCardBtn = document.getElementById('submitCard');
	var menuOverlay = document.getElementById('menu-overlay');
	var menu = document.getElementById('main-menu');
	var menu2 = document.getElementById('secondary-menu');
	var menu3 = document.getElementById('tertiary-menu-one');
	var menu4 = document.getElementById('tertiary-menu-two');
	var catMenu = document.getElementById('categories-menu');
	var line1 = document.getElementById('vert-line-1');
	var line2 = document.getElementById('vert-line-2');
	var menuBar1 = document.getElementById('menu-bar-one');
	var menuBar2 = document.getElementById('menu-bar-two');
	var menuBar3 = document.getElementById('menu-bar-three');
	var backBtn = document.getElementById('backBtn');
	var newCategoryInput = document.getElementById('addCategoryInput');
	var newCardInput = document.getElementById('addCardInput');
	var cardContent = document.getElementById('card-content');
	var fcNum = document.getElementById('flashcard-num');
	var fcRelTxt = document.getElementById('flashcard-relational-text');
	var currentCat = document.getElementById('currentCat');
	var addCardLabel = document.getElementById('addCardLabel');
	var grid = document.getElementById('gridOverlay');
	var leftBtn = document.getElementById('leftBtn');
	var rightBtn = document.getElementById('rightBtn');
	var noCardsMsg = document.getElementById('no-cards-message');
	var current = void 0;
	var currentCards = void 0;
	var cardIndex = void 0;
	var catIndex = void 0;

	/**
  * Code to create the database that will store the decks
  */

	var flashcardsDB = function () {
		var flashcardsDB = {};
		var datastore = null;

		// flashcards: Add methods for interacting with the database here.

		// Export the tDB object.
		return flashcardsDB;
	}();

	var db;

	flashcardsDB.indexedDBOk = function () {
		return "indexedDB" in window;
	};

	document.addEventListener("DOMContentLoaded", function () {

		//No support? Go in the corner and pout.
		if (!flashcardsDB.indexedDBOk) return;

		var openRequest = indexedDB.open("idarticle_categories", 1);

		openRequest.onupgradeneeded = function (e) {
			var thisDB = e.target.result;

			if (!thisDB.objectStoreNames.contains("categories")) {
				thisDB.createObjectStore("categories", {
					autoIncrement: true
				});
				// I want to be able to search categories by name later
				//os.createIndex("categoryNames", "name", {
				//	unique: false
				//});
			}
		};

		function appendCardContent(clicked, items) {
			console.log('Running appendCardContent');
			var random = void 0;
			console.log(items);
			current = clicked;

			if (clicked) {
				currentCat.innerText = current;

				items.forEach(function (i) {
					var x = i.name;
					if (x == current) {
						random = getRandomInt(0, i.cards.length);
						cardIndex = random;
						catIndex = i;
						currentCards = i.cards;
						var content = i.cards[cardIndex];
						fcNum.innerText = '0' + (random + 1);
						cardContent.innerHTML = content;
					}
				});
			} else {
				currentCat.innerText = '*';
			}
			if (!items) {
				cardContent.innerHTML = "<p>There's nothing here.Add something.</p>";
			}
		}

		function showCardsGrid(items) {
			console.log('Running  showCardsGrid');
			var tl = new TimelineLite();
			var frag = document.createDocumentFragment();
			var menuInner = document.getElementById('menu-inner');
			var addFirstCat = document.getElementById('add-first-cat');
			if (items.length === 0) {
				TweenLite.to(noCardsMsg, 0.7, {
					display: 'block',
					opacity: 1,
					y: -15
				});
				addFirstCat.addEventListener('click', function () {
					tl.to(menuOverlay, 0, {
						display: 'flex',
						opacity: 0.95
					});
					showCategoryInput();
					hideCardsGrid();
				});
			} else {
				grid.addEventListener('click', hideCardsGrid, false);
				for (var i = 0; i < 9; i++) {
					var a = document.createElement('a');
					var li = document.createElement('li');
					li.setAttribute('class', 'grid__item');

					if (i < items.length) {
						console.log(items.length);
						li.innerText = items[i].name;
						console.log(li.innerText);
						if (li.innerText !== '') {

							a.addEventListener('click', function (e) {
								var clicked = e.target.innerText;
								console.log(clicked);
								currentCat.innerText = clicked;
								console.log('clicked!!!');
								menuTransition();
								// Append the content to the DOM
								appendCardContent(clicked, items);
							});
						} else {
							return;
						};
					}
					a.appendChild(li);
					frag.appendChild(a);
				}
			}
			gridOverlay.appendChild(frag);

			TweenLite.to(grid, 0.7, {
				y: -20,
				ease: Power1.easeOut
			});
		}

		openRequest.onsuccess = function (e) {
			console.log("running onsuccess");
			db = e.target.result;

			flashcardsDB.getCards(function (items) {
				console.log('Running getCards callback');
				// Display initial content
				appendCardContent();
				showCardsGrid(items);
				var menuInner = document.getElementById('menu-inner');
				menuInner.innerHTML = '';
				var frag = document.createDocumentFragment();
				for (var i = 0; i < items.length; i++) {
					var a = document.createElement('a');
					var li = document.createElement('li');
					var length = void 0;
					li.setAttribute('class', 'menu__item');
					a.setAttribute('data-category', items[i].name);
					if (!items[i].cards.length) {
						length = 0;
					} else {
						length = items[i].cards.length;
					};
					if (length === 1) {
						li.innerHTML = '<span>' + items[i].name + '</span>\n\t\t\t\t<span class="menu__item__num">' + length + ' card</span>';
					} else {
						li.innerHTML = '<span>' + items[i].name + '</span>\n\t\t\t\t<span class="menu__item__num">' + length + ' cards</span>';
					}
					a.appendChild(li);
					frag.appendChild(a);
					li.addEventListener('click', function (e) {
						var clicked = e.target.innerText;

						// Run a function that takes the category name you clicked on as a parameter
						appendCardContent(clicked, items);
						hideMenus();
					});
					menuInner.appendChild(frag);
					catMenu.setAttribute('class', 'relational-menu');
				}
			});

			submitCardBtn.addEventListener('click', function (e) {

				//flashcardsDB.addNewCard(items);
				flashcardsDB.getCards(function (items) {
					console.log(items);
					flashcardsDB.addNewCard(items);
				});
				(function confirm() {
					var newCardMenuInner = document.getElementById('newCardInner');
					var confirmation = document.createElement('span');
					confirmation.setAttribute('class', 'add-card__confirmation');
					confirmation.innerText = 'New card successfully added';
					newCardMenuInner.appendChild(confirmation);
					var tl = new TimelineLite();
					tl.to(newCategoryInput, 0.05, {
						opacity: 0
					}).to(newCategoryInput, 0.1, {
						opacity: 1,
						delay: 0.1
					});
					TweenLite.to(confirmation, 1, {
						y: -15,
						opacity: 1,
						ease: Power1.easeOut
					});
				})();
			});
		};

		openRequest.onerror = function (e) {
			//Do something for the error
		};
	}, false);

	flashcardsDB.addNewCategory = function (e) {
		var name = newCategoryInput.value;

		console.log("About to add " + name);

		var transaction = db.transaction(["categories"], "readwrite");
		var store = transaction.objectStore("categories");

		//Define a category object
		var category = {
			name: name,
			created: new Date(),
			cards: []
		};

		//Perform the add
		var request = store.add(category);

		request.onerror = function (e) {
			console.log("Error", e.target.error.name);
			//some type of error handler
		};

		request.onsuccess = function (e) {
			console.log("Woot! Did it");
		};
	};

	flashcardsDB.addNewCard = function (items) {

		current = currentCat.innerText;
		var cardsArr = void 0;
		// Get the current category depending on which menu item was clicked
		console.log('Unfiltered: ' + items);
		for (var i = 0; i < items.length; i++) {
			if (items[i].name === current) {
				cardsArr = items[i].cards;
				console.log(cardsArr);

				console.log('Added card!');
			}
		};
		var lb = newCardInput.value.replace(/(\n)+/g, '<br>');
		console.log('cardsArr=', cardsArr);
		console.log(lb);
		cardsArr.push(lb);
		newCardInput.value = '';

		// Updates the database with the new input

		var title = current;

		var transaction = db.transaction(['categories'], 'readwrite');
		var objectStore = transaction.objectStore('categories');

		objectStore.openCursor().onsuccess = function (event) {
			var cursor = event.target.result;
			if (cursor) {
				if (cursor.value.name === current) {
					var updateData = cursor.value;

					updateData.cards = cardsArr;
					var request = cursor.update(updateData);
					request.onsuccess = function () {
						console.log('A better album year?');
					};
				};
				cursor.continue();
			} else {
				console.log('Entries displayed.');
			}
		};
	};

	// Get all cards in the database (not filtered)
	flashcardsDB.getCards = function (callback) {
		console.log('Running getCards');
		var transaction = db.transaction("categories", IDBTransaction.READ_ONLY);
		var store = transaction.objectStore("categories");
		var items = [];

		transaction.oncomplete = function (evt) {

			callback(items);
			console.log(items);
		};

		var cursorRequest = store.openCursor();

		cursorRequest.onerror = function (error) {
			console.log(error);
		};

		cursorRequest.onsuccess = function (evt) {
			var cursor = evt.target.result;
			if (cursor) {
				items.push(cursor.value);
				cursor.continue();
			}
		};
	};

	flashcardsDB.deleteEverything = function () {
		// open a read/write db transaction, ready for deleting the data
		var transaction = db.transaction(["categories"], "readwrite");

		// report on the success of opening the transaction
		transaction.oncomplete = function (event) {
			console.log('Transaction completed: database modification finished.');
		};

		transaction.onerror = function (event) {
			console.log('Transaction not opened due to error: ' + transaction.error);
		};

		// create an object store on the transaction
		var objectStore = transaction.objectStore("categories");

		// Delete the specified record out of the object store
		var objectStoreRequest = objectStore.clear();

		objectStoreRequest.onsuccess = function (event) {
			// report the success of our delete operation
			console.log('Record deleted.');
		};
	};

	flashcardsDB.deleteRecord = function (variable) {
		// open a read/write db transaction, ready for deleting the data
		var transaction = db.transaction(["categories"], "readwrite");

		// report on the success of opening the transaction
		transaction.oncomplete = function (event) {
			console.log('Transaction completed: database modification finished.');
		};

		transaction.onerror = function (event) {
			console.log('Transaction not opened due to error: ' + transaction.error);
		};

		// create an object store on the transaction
		var objectStore = transaction.objectStore("categories");

		// Delete the specified record out of the object store
		var objectStoreRequest = objectStore.delete(variable);

		objectStoreRequest.onsuccess = function (event) {
			// report the success of our delete operation
			console.log('Record deleted.');
		};
	};

	/**
  * Menu opening and transition
  */

	function getRandomInt(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min)) + min;
	}

	function nextCard() {

		console.log(cardIndex);
		if (cardIndex < currentCards.length && cardIndex >= 0) {
			cardIndex += 1;
			console.log(currentCards.length);
			cardContent.innerText = catIndex.cards[cardIndex];
			if (cardIndex < 9) {
				fcNum.innerText = '0' + (cardIndex + 1);
			} else {
				fcNum.innerText = cardIndex + 1;
			}
		} else {
			return;
		}
	}

	function prevCard() {

		console.log(cardIndex);
		if (cardIndex <= currentCards.length && cardIndex > 0) {
			cardIndex -= 1;
			console.log(currentCards.length);
			cardContent.innerText = catIndex.cards[cardIndex];
			if (cardIndex < 9) {
				fcNum.innerText = '0' + (cardIndex + 1);
			} else {
				fcNum.innerText = cardIndex + 1;
				leftBtn.css = 'opacity: 0.1';
			}
		} else {
			return;
		}
	}

	function showMenus() {

		var tl = new TimelineLite();
		var tl2 = new TimelineLite();

		flashcardsDB.getCards(function (items) {

			var frag = document.createDocumentFragment();
			var menuInner = document.getElementById('menu-inner');
			for (var i = 0; i < items.length; i++) {
				var a = document.createElement('a');
				var li = document.createElement('li');
				var length = void 0;
				li.setAttribute('class', 'menu__item');
				a.setAttribute('data-category', items[i].name);
				if (items[i].cards.length) {
					length = 0;
				} else {
					length = items[i].cards.length;
				};
				li.innerHTML = '<span>' + items[i].name + '</span>\n\t\t\t\t<span class="menu__item__num">' + length + ' cards</span>';
				a.appendChild(li);
				frag.appendChild(a);
				li.addEventListener('click', function (e) {
					var clicked = e.target.innerText;

					hideMenus();
					// Run a function that takes the category name you clicked on as a parameter
					appendCardContent(clicked, items);
				});
				menuInner.appendChild(frag);
			}
		});

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

	function hideMenus() {
		console.log('Running hideMenus');
		var tl = new TimelineLite();
		var tl2 = new TimelineLite();
		var tl3 = new TimelineLite();
		var addCategoryMenu = document.getElementById("tertiary-menu-one");
		var menuInner = document.getElementById('menu-inner');

		menuInner.innerHTML = '';

		// Animation

		tl.to(menu, 0.1, {
			opacity: 0
		}).to(menu, 0, {
			display: 'none'
		}).to(menuOverlay, 1, {
			opacity: 0
		}).to(menuOverlay, 0, {
			display: 'none'
		});
		tl2.to(menu2, 0.1, {
			opacity: 0
		}).to(menu2, 0, {
			display: 'none'
		});
		tl3.to(menu3, 0.1, {
			opacity: 0
		}).to(menu3, 0, {
			display: 'none'
		});
		tl3.to(menu4, 0.1, {
			opacity: 0
		}).to(menu4, 0, {
			display: 'none'
		});
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

		var slider = document.createElement('div');
		var tl = new TimelineLite();

		slider.classList.add('menu-transition');
		document.body.appendChild(slider);

		tl.to(slider, 0.3, {
			width: '100vw'
		}).to(slider, 0.7, {
			opacity: 0,
			delay: 0.3
		}).to(slider, 0, {
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
		console.log('Running showCategoryInput');
		var tl = new TimelineLite();
		var addCategoryMenu = document.getElementById("tertiary-menu-one");

		backBtn.addEventListener('click', function (e) {
			TweenLite.to(addCategoryMenu, 0, {
				display: 'none'
			});
			menuTransition();
			setTimeout(showMenus, 1500);
		});

		menuTransition();

		tl.to(menu3, 0, {
			display: 'flex'
		}).to(menu3, 0.3, {
			opacity: 1,
			delay: 1.4
		});
		// Fade out main menu
		TweenLite.to(line1, 0.7, {
			display: 'inline-block',
			height: '100vh',
			delay: 1.2
		});

		menu3.addEventListener('click', function (e) {
			e.stopPropagation();
		});
	}

	function showCardInput() {
		var current = currentCat.innerText;
		var tl = new TimelineLite();
		var addCardMenu = document.getElementById("tertiary-menu-two");
		addCardLabel.innerText = 'Add a new card to ' + current + ':';
		backBtn2.addEventListener('click', function (e) {
			TweenLite.to(addCardMenu, 0, {
				display: 'none'
			});
			menuTransition();
			setTimeout(showMenus, 1500);
		});

		menuTransition();

		tl.to(menu4, 0, {
			display: 'flex'
		}).to(menu4, 0.3, {
			opacity: 1,
			delay: 1.4
		});
		// Fade out main menu
		TweenLite.to(line1, 0.7, {
			display: 'inline-block',
			height: '100vh',
			delay: 1.2
		});

		menu4.addEventListener('click', function (e) {
			e.stopPropagation();
		});
	}

	function hideCardsGrid() {
		var tl = new TimelineLite();

		tl.to(grid, 0.7, {
			opacity: 0
		}).to(grid, 0, {
			display: 'none'
		});
		TweenLite.to(noCardsMsg, 0.2, {
			opacity: 0
		});
	}

	// Event listeners

	menuBtn.addEventListener('click', showMenus);
	menuOverlay.addEventListener('click', hideMenus, false);
	leftBtn.addEventListener('click', prevCard, false);
	rightBtn.addEventListener('click', nextCard, false);
	addCategoryBtn.addEventListener('click', function (e) {

		e.stopPropagation();
		showCategoryInput();
	});

	addCardBtn.addEventListener('click', function (e) {

		e.stopPropagation();
		showCardInput();
	});

	// gridBtn.addEventListener('click', showCardsGrid);
	// 

	document.body.onkeyup = function (e) {
		if (e.keyCode === 39) {
			var tl = new TimelineLite();
			tl.to(rightBtn, 0.2, {
				color: '#ffffff',
				scale: 1.8
			}).to(rightBtn, 0.7, {
				color: '#a9a9a9',
				scale: 1
			});
		}
		if (e.keyCode === 37) {
			var _tl = new TimelineLite();
			_tl.to(leftBtn, 0.2, {
				color: '#ffffff',
				scale: 1.8
			}).to(leftBtn, 0.7, {
				color: '#a9a9a9',
				scale: 1
			});
		}
	};

	// Listen for submission of new category
	newCategoryInput.onkeyup = function (e) {
		if (e.keyCode == 13 && newCategoryInput.value !== "") {
			modal();
		}
	};

	function modal() {

		var modal = document.createElement('div');
		var modalOverlay = document.createElement('div');
		var frag = document.createDocumentFragment();
		var btnHolder = document.createElement('div');
		var confirmBtn = document.createElement('button');
		var cancelBtn = document.createElement('button');
		var modalTxt = document.createElement('span');

		confirmBtn.setAttribute('class', 'btn-submit');
		cancelBtn.setAttribute('class', 'btn-submit');
		btnHolder.setAttribute('class', 'wrapper');
		modalTxt.setAttribute('class', 'modal-text');
		modal.setAttribute('class', 'confirmation-modal');
		modalOverlay.setAttribute('class', 'modal-overlay');

		modalTxt.innerText = 'Are you sure you want to create the ' + newCategoryInput.value + ' category?';
		confirmBtn.innerText = 'Submit';
		cancelBtn.innerText = 'Cancel';

		btnHolder.appendChild(confirmBtn);
		btnHolder.appendChild(cancelBtn);
		frag.appendChild(modalTxt);
		frag.appendChild(btnHolder);
		body.appendChild(modalOverlay);
		modalOverlay.appendChild(modal);
		modal.appendChild(frag);

		TweenLite.to(modal, 0.3, {
			height: '200px',
			delay: 0.2,
			ease: Power1.easeOut
		});
		TweenLite.to(btnHolder, 0.3, {
			opacity: 1,
			delay: 0.5
		});
		TweenLite.to(modalTxt, 0.3, {
			opacity: 1,
			delay: 0.5
		});

		modalOverlay.addEventListener('click', function () {
			console.log('closed overlay');
			e.stopPropagation();
			TweenLite.to(modalOverlay, 0.2, {
				display: 'none'
			});
		});

		confirmBtn.addEventListener('click', function () {

			flashcardsDB.addNewCategory();
			flashcardsDB.getCards(function (items) {
				console.log('Running getCards callback');
				var frag = document.createDocumentFragment();
				for (var i = 0; i < items.length; i++) {
					var a = document.createElement('a');
					var li = document.createElement('li');
					var length = void 0;
					li.setAttribute('class', 'menu__item');
					a.setAttribute('data-category', items[i].name);
					if (items[i].cards.length) {
						length = 0;
					} else {
						length = items[i].cards.length;
					};
					li.innerHTML = '<span>' + items[i].name + '</span>\n\t\t\t\t<span class="menu__item__num">' + length + ' cards</span>';
					a.appendChild(li);
					frag.appendChild(a);
					li.addEventListener('click', function (e) {
						hideMenus();
						var clicked = e.target.innerText;
						currentCat.innerText = clicked;
						// Append the content to the DOM

						//	appendCardContent(clicked, items)
					});
					menuInner.appendChild(frag);
				}
			});

			function confirm() {
				var newCatMenuInner = document.getElementById('newCategoryInner');
				var confirmation = document.createElement('span');
				confirmation.setAttribute('class', 'add-category__confirmation');
				confirmation.innerText = newCategoryInput.value + ' category successfully added';
				newCatMenuInner.appendChild(confirmation);
				var tl = new TimelineLite();
				tl.to(newCategoryInput, 0.05, {
					opacity: 0
				}).to(newCategoryInput, 0.1, {
					opacity: 1,
					delay: 0.1
				});
				TweenLite.to(confirmation, 1, {
					y: -15,
					opacity: 1,
					ease: Power1.easeOut
				});
				newCategoryInput.value = "";
			};
		});

		cancelBtn.addEventListener('click', function (e) {
			e.stopPropagation();

			TweenLite.to(modal, 0.2, {
				height: '0px',
				delay: 0.1,
				ease: Power1.easeOut
			});
			TweenLite.to(modalTxt, 0.1, {
				opacity: 0
			});
			TweenLite.to(btnHolder, 0.1, {
				opacity: 0
			});
			TweenLite.to(modal, 0, {
				display: 'none',
				delay: 0.3
			});
			TweenLite.to(modalOverlay, 0, {
				display: 'none',
				delay: 0.5
			});
		});
	}

	newCardInput.onkeyup = function (e) {
		console.log(this);
		if (this.clientHeight < this.scrollHeight) {
			this.style.height = this.scrollHeight + 'px';
		}
	};
})();