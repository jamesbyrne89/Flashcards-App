window.onload = (function init() {


	// Declare global variables


	const menuBtn = document.getElementById('menu-btn');
	const addCategoryBtn = document.getElementById('addCategory');
	const addCardBtn = document.getElementById('addCard');
	const submitCardBtn = document.getElementById('submitCard');
	const menuOverlay = document.getElementById('menu-overlay');
	const menu = document.getElementById('main-menu');
	const menu2 = document.getElementById('secondary-menu');
	const menu3 = document.getElementById('tertiary-menu-one');
	const menu4 = document.getElementById('tertiary-menu-two');
	const catMenu = document.getElementById('categories-menu');
	const line1 = document.getElementById('vert-line-1');
	const line2 = document.getElementById('vert-line-2');
	const menuBar1 = document.getElementById('menu-bar-one');
	const menuBar2 = document.getElementById('menu-bar-two');
	const menuBar3 = document.getElementById('menu-bar-three');
	const backBtn = document.getElementById('backBtn');
	const newCategoryInput = document.getElementById('addCategoryInput');
	const newCardInput = document.getElementById('addCardInput');
	const cardContent = document.getElementById('card-content');
	const fcNum = document.getElementById('flashcard-num');
	const fcRelTxt = document.getElementById('flashcard-relational-text');
	const currentCat = document.getElementById('currentCat');
	const addCardLabel = document.getElementById('addCardLabel');
	const grid = document.getElementById('gridOverlay');
	const leftBtn = document.getElementById('leftBtn');
	const rightBtn = document.getElementById('rightBtn');
	const noCardsMsg = document.getElementById('no-cards-message');
	const filler = document.getElementById('filler');
	const introText = document.getElementById('intro__title');
	const fillerHolder = document.getElementById('filler-holder');
	let current;
	let currentCards;
	let cardIndex;
	let catIndex;


	// Expand textarea when filled with content
	newCardInput.onkeyup = function(e) {
		console.log(this)
		if (this.clientHeight < this.scrollHeight) {
			this.style.height = this.scrollHeight + 'px';
		}
	};


	/**
	 * Code to create the database that will store the decks
	 */

import "flashcardsDB";
import "flashcardsDB.addNewCategory";


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
				thisDB.createObjectStore("categories", {
					autoIncrement: true
				});
				// I want to be able to search categories by name later
				//os.createIndex("categoryNames", "name", {
				//	unique: false
				//});
			}
		}

		function appendCardContent(clicked, items) {
			console.log('Running appendCardContent')
			console.log(items)
			current = clicked;

			if (clicked) {
				currentCat.innerText = current;
				items.forEach(function(i) {
					var x = i.name;
					if (x === current) {
						let content = i.cards[cardIndex];
						// Show a random card
						cardIndex = getRandomInt(0, i.cards.length)
						catIndex = i;
						currentCards = i.cards;
						fcNum.innerText = '0' + (cardIndex + 1);
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

			let tl = new TimelineLite();
			let tl2 = new TimelineLite({onComplete:buildGridMenu});
			let frag = document.createDocumentFragment();
			let menuInner = document.getElementById('menu-inner');
			const addFirstCat = document.getElementById('add-first-cat');

			TweenLite.to(introText, 0, {opacity: 1, delay: 1});
			TweenLite.to(introText, 0, {opacity: 0, delay: 4.4});
			TweenLite.to(fillerHolder, 0, {display: 'none', delay: 4.8});
			tl2.to(filler, 1, {width: '100%', ease: Power1.easeOut})
					.to(filler, 0.7, {width: '0px', right: '0', left: 'auto', ease: Circ.easeOut, delay: 0.2})
					.to(filler, 0.4, {width: '100%', ease: Circ.easeOut, delay: 2})
					.to(filler, 0.4, {width: '0px', left: '0',right: 'auto', ease: Circ.easeOut, delay: 0.2})

			function buildGridMenu() {		
			if (items.length === 0) {
				TweenLite.to(noCardsMsg, 0.7, {
					display: 'block',
					opacity: 1,
					y: -15
				});
				addFirstCat.addEventListener('click', function() {
					tl.to(menuOverlay, 0, {
						display: 'flex',
						opacity: 0.95
					});
					showCategoryInput();
					hideCardsGrid();
				});
			} else {
				grid.addEventListener('click', hideCardsGrid, false);

				for (obj in items) {
					if (items[obj].hasOwnProperty('name')) {
					let a = document.createElement('a');
					let li = document.createElement('li');

					li.setAttribute('class', 'grid__item');
					li.innerText = items[obj].name;
						if (li.innerText !== '') {

							a.addEventListener('click', function(e) {
								let clicked = e.target.innerText;
								currentCat.innerText = clicked;
								menuTransition();
								// Append the content to the DOM
								appendCardContent(clicked, items)


							})
						}
						else {
							return;
						};
					a.appendChild(li);
					frag.appendChild(a);
				}
			}
			}
			gridOverlay.appendChild(frag);


			TweenLite.to(grid, 0.7, {
				y: -20,
				ease: Power1.easeOut
			});
			}
		}

		openRequest.onsuccess = function(e) {
			console.log("running onsuccess");
			db = e.target.result;

			/**
			 * Grab all the cards from the database
			 */

			flashcardsDB.getCards(function(items) {
				console.log('Running getCards callback');

				// Display all categories as a grid
				showCardsGrid(items);

				// Display initial content
				appendCardContent();

				// Update menus
				updateCategoryMenu(items);

			});


			submitCardBtn.addEventListener('click', function(e) {
				/**
				 * Grab all the cards from the database
				 */				
				flashcardsDB.getCards(function(items) {
					console.log(items)
					// Update the database with the new card
					flashcardsDB.addNewCard(items);
				});
				// Show confirmation that category has been added
				(function confirm() {
					const newCardMenuInner = document.getElementById('newCardInner');
					let tl = new TimelineLite();
					let confirmation = document.createElement('span');

					confirmation.setAttribute('class', 'add-card__confirmation');
					confirmation.innerText = `New card successfully added`;
					newCardMenuInner.appendChild(confirmation);
					
					// Animations for confirmation message
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
		}

		openRequest.onerror = function(e) {
			Alert('Error accessing the database')
			//Do something for the error
		}

	}, false);




	flashcardsDB.addNewCard = function(items) {

		current = currentCat.innerText
		let cardsArr;
		// Get the current category depending on which menu item was clicked
		console.log('Unfiltered: ' + items)
		for (let i = 0; i < items.length; i++) {
			if (items[i].name === current) {
				cardsArr = items[i].cards;
				console.log(cardsArr)

				console.log('Added card!')
			}
		};
		let lb = newCardInput.value.replace(/(\n)+/g, '<br>');
		console.log('cardsArr=', cardsArr)
		cardsArr.push(lb);
		newCardInput.value = '';


		// Updates the database with the new input

		let title = current;

		let transaction = db.transaction(['categories'], 'readwrite');
		let objectStore = transaction.objectStore('categories');

		objectStore.openCursor().onsuccess = function(event) {
			let cursor = event.target.result;
			if (cursor) {
				if (cursor.value.name === current) {
					let updateData = cursor.value;

					updateData.cards = cardsArr;
					let request = cursor.update(updateData);
					request.onsuccess = function() {
						console.log('A better album year?');
					};
				};
				cursor.continue();
			} else {
				console.log('Entries displayed.');
			}
		};

	}


	// Get all cards in the database (not filtered)
	flashcardsDB.getCards = function(callback) {
		console.log('Running getCards');
		let transaction = db.transaction("categories", IDBTransaction.READ_ONLY);
		let store = transaction.objectStore("categories");
		let items = [];

		transaction.oncomplete = function(evt) {

			callback(items);
			console.log(items);
		};

		let cursorRequest = store.openCursor();

		cursorRequest.onerror = function(error) {
			console.log(error);
		};

		cursorRequest.onsuccess = function(evt) {
			var cursor = evt.target.result;
			if (cursor) {
				items.push(cursor.value);
				cursor.continue();
			}

		};

	}

	flashcardsDB.deleteEverything = function() {
		// open a read/write db transaction, ready for deleting the data
		var transaction = db.transaction(["categories"], "readwrite");

		// report on the success of opening the transaction
		transaction.oncomplete = function(event) {
			console.log('Transaction completed: database modification finished.');
		};


		transaction.onerror = function(event) {
			console.log('Transaction not opened due to error: ' + transaction.error);
		};

		// create an object store on the transaction
		var objectStore = transaction.objectStore("categories");

		// Delete the specified record out of the object store
		var objectStoreRequest = objectStore.clear();

		objectStoreRequest.onsuccess = function(event) {
			// report the success of our delete operation
			console.log('Record deleted.');
		};
	};

	flashcardsDB.deleteRecord = function(variable) {
		// open a read/write db transaction, ready for deleting the data
		var transaction = db.transaction(["categories"], "readwrite");

		// report on the success of opening the transaction
		transaction.oncomplete = function(event) {
			console.log('Transaction completed: database modification finished.');
		};


		transaction.onerror = function(event) {
			console.log('Transaction not opened due to error: ' + transaction.error);
		};

		// create an object store on the transaction
		var objectStore = transaction.objectStore("categories");

		// Delete the specified record out of the object store
		var objectStoreRequest = objectStore.delete(variable);

		objectStoreRequest.onsuccess = function(event) {
			// report the success of our delete operation
			console.log('Record deleted.');
		};
	};


	/**
	 * Get a random number within a range
	 */

	function getRandomInt(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min)) + min;
	}

	/**
	 * Go to the next card in the array
	 */

	function nextCard() {
		slideRight()
		console.log(cardIndex)
		if (cardIndex < currentCards.length && cardIndex >= 0) {
			cardIndex += 1;
			console.log(currentCards.length)
			cardContent.innerText = catIndex.cards[cardIndex];
			if (cardIndex < 9) {
				fcNum.innerText = '0' + (cardIndex + 1);
				TweenLite.to(cardContent, 1, {x: -300, opacity: 1})
			} else {
				fcNum.innerText = (cardIndex + 1);
				TweenLite.to(cardContent, 1, {x: -300, opacity: 1})
			}
		} else {
			return;
		}
	}

	// Animate card left
	function slideLeft() {
		console.log('left')
		TweenLite.to(cardContent, 1, {x: -300, opacity: 0, onComplete: prevCard})
	}

	// Animate card right
	function slideRight() {
		console.log('right')
		TweenLite.to(cardContent, 1, {x: 300, opacity: 0, onComplete: nextCard})
	}	

	// Grab the previous card in the array
	function prevCard() {
		console.log(cardIndex)
		if (cardIndex <= currentCards.length && cardIndex > 0) {
			cardIndex -= 1;
			console.log(currentCards.length)
			slideLeft();
			cardContent.innerText = catIndex.cards[cardIndex];
			if (cardIndex < 9) {
				fcNum.innerText = '0' + (cardIndex + 1);
				TweenLite.to(cardContent, 1, {x: 300, opacity: 1})
			} else {
				fcNum.innerText = (cardIndex + 1);
				leftBtn.css = ('opacity: 0.1')
				TweenLite.to(cardContent, 1, {x: 300, opacity: 1})
			}
		} else {
			return;
		}
	}

	function showMenus() {

		const tl = new TimelineLite();
		const tl2 = new TimelineLite();



		flashcardsDB.getCards(function(items) {
updateCategoryMenu(items)
});
/**
			let frag = document.createDocumentFragment();
			let menuInner = document.getElementById('menu-inner');
			menuInner.innerHTML='';
			for (let i = 0; i < items.length; i++) {
				
				let a = document.createElement('a');
				let li = document.createElement('li');
				let length;
				li.setAttribute('class', 'menu__item');
				a.setAttribute('data-category', items[i].name);
				if (items[i].cards.length) {
					length = 0;
				} else {
					length = items[i].cards.length;
				};
				li.innerHTML = `<span>${items[i].name}</span>
				<span class="menu__item__num">${length} cards</span>`;
				a.appendChild(li);
				frag.appendChild(a);
				li.addEventListener('click', function(e) {
					let clicked = e.target.innerText;

					hideMenus();
					// Run a function that takes the category name you clicked on as a parameter
					appendCardContent(clicked, items)
				});
				console.log('Appending frag...');
				menuInner.appendChild(frag);
			}
		});
**/

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
		console.log('Running hideMenus')
		const tl = new TimelineLite();
		const tl2 = new TimelineLite();
		const tl3 = new TimelineLite();
		const addCategoryMenu = document.getElementById("tertiary-menu-one");
		const menuInner = document.getElementById('menu-inner')
		// Animation

		tl.to(menu, 0.1, {
			opacity: 0
		}).to(menu, 0, {
			display: 'none'
		}).to(menuOverlay, 1, {
			opacity: 0
		}).to(menuOverlay, 0, {
			display: 'none',
			onComplete: function(){
				menuInner.innerHTML = '';
			}
		})
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

		const slider = document.createElement('div');
		const tl = new TimelineLite();

		slider.classList.add('menu-transition');
		document.body.appendChild(slider);

		tl.to(slider, 0.3, {
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
		});
		TweenLite.to(line2, 0.2, {
			height: '0',
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
		const tl = new TimelineLite();
		const addCategoryMenu = document.getElementById("tertiary-menu-one");

		backBtn.addEventListener('click', function(e) {
			TweenLite.to(addCategoryMenu, 0, {
				display: 'none'
			});
			menuTransition();
			setTimeout(showMenus, 1500);

		})

		menuTransition();

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
	}

	function showCardInput() {
		let current = currentCat.innerText;
		const tl = new TimelineLite();
		const addCardMenu = document.getElementById("tertiary-menu-two");
		addCardLabel.innerText = `Add a new card to ${current}:`;
		backBtn2.addEventListener('click', function(e) {
			TweenLite.to(addCardMenu, 0, {
				display: 'none'
			});
			menuTransition();
			setTimeout(showMenus, 1500);

		})

		menuTransition();

		tl.to(menu4, 0, {
				display: 'flex'
			})
			.to(menu4, 0.3, {
				opacity: 1,
				delay: 1.4
			});
		// Fade out main menu
		TweenLite.to(line1, 0.7, {
			display: 'inline-block',
			height: '100vh',
			delay: 1.2
		});

		menu4.addEventListener('click', function(e) {
			e.stopPropagation();
		});
	}



	function hideCardsGrid() {
		let tl = new TimelineLite();

		tl.to(grid, 0.7, {
				opacity: 0
			})
			.to(grid, 0, {
				display: 'none'
			});
		TweenLite.to(noCardsMsg, 0.2, {
			opacity: 0,
		});

	}

	function updateCategoryMenu(items) {
				let menuInner = document.getElementById('menu-inner');
				menuInner.innerHTML = '';
				let frag = document.createDocumentFragment();
				for (let i = 0; i < items.length; i++) {
					let a = document.createElement('a');
					let li = document.createElement('li');
					let length;
					li.setAttribute('class', 'menu__item');
					a.setAttribute('data-category', items[i].name);
					if (!items[i].cards.length) {
						length = 0;
					} else {
						length = items[i].cards.length;
					};
					if (length === 1) {
						li.innerHTML = `<span>${items[i].name}</span>
				<span class="menu__item__num">${length} card</span>`
					} else {
						li.innerHTML = `<span>${items[i].name}</span>
				<span class="menu__item__num">${length} cards</span>`;
					}
					a.appendChild(li);
					frag.appendChild(a);
					li.addEventListener('click', function(e) {
						let clicked = e.target.innerText;

						// Run a function that takes the category name you clicked on as a parameter
						hideMenus();
						appendCardContent(clicked, items)
						
					});
									}
					menuInner.appendChild(frag);
					catMenu.setAttribute('class', 'relational-menu')
	}


	// Event listeners

	menuBtn.addEventListener('click', showMenus);
	menuOverlay.addEventListener('click', hideMenus, false);
	leftBtn.addEventListener('click', slideLeft, false);
	rightBtn.addEventListener('click', slideRight, false);
	addCategoryBtn.addEventListener('click', function(e) {
		e.stopPropagation();
		showCategoryInput();
	});

	addCardBtn.addEventListener('click', function(e) {
		e.stopPropagation();
		showCardInput();
	});

	// gridBtn.addEventListener('click', showCardsGrid);
	// 

	document.body.onkeyup = function(e) {
		if (e.keyCode === 39) {
			let tl = new TimelineLite();
			tl.to(rightBtn, 0.2, {
					color: '#ffffff',
					scale: 1.8,
					onComplete: slideRight
				})
				.to(rightBtn, 0.7, {
					color: '#a9a9a9',
					scale: 1
				});
		}
		if (e.keyCode === 37) {
			let tl = new TimelineLite();
			tl.to(leftBtn, 0.2, {
					color: '#ffffff',
					scale: 1.8,
					onComplete: slideLeft
				})
				.to(leftBtn, 0.7, {
					color: '#a9a9a9',
					scale: 1
				});
		}
	}

	// Listen for submission of new category
	newCategoryInput.onkeyup = function(e) {
		if (e.keyCode == 13 && newCategoryInput.value !== "") {
			modal();
		}
	}


	function modal() {

		const modal = document.createElement('div');
		const modalOverlay = document.createElement('div');
		let frag = document.createDocumentFragment();
		const btnHolder = document.createElement('div');
		const confirmBtn = document.createElement('button');
		const cancelBtn = document.createElement('button');
		const modalTxt = document.createElement('span');

		confirmBtn.setAttribute('class', 'btn-submit');
		cancelBtn.setAttribute('class', 'btn-submit');
		btnHolder.setAttribute('class', 'wrapper');
		modalTxt.setAttribute('class', 'modal-text');
		modal.setAttribute('class', 'confirmation-modal');
		modalOverlay.setAttribute('class', 'modal-overlay');

		modalTxt.innerText = `Are you sure you want to create the ${newCategoryInput.value} category?`;
		confirmBtn.innerText = 'Submit';
		cancelBtn.innerText = 'Cancel';

		btnHolder.appendChild(confirmBtn);
		btnHolder.appendChild(cancelBtn);
		frag.appendChild(modalTxt);
		frag.appendChild(btnHolder);
		body.appendChild(modalOverlay)
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

		modalOverlay.addEventListener('click', function() {
			console.log('closed overlay')
			e.stopPropagation();
			TweenLite.to(modalOverlay, 0.2, {
				display: 'none'
			});
		});

		confirmBtn.addEventListener('click', function() {

			flashcardsDB.addNewCategory();
			flashcardsDB.getCards(function(items) {
				console.log('Running getCards callback');
				let frag = document.createDocumentFragment();
				for (let i = 0; i < items.length; i++) {
					let a = document.createElement('a');
					let li = document.createElement('li');
					let length;
					li.setAttribute('class', 'menu__item');
					a.setAttribute('data-category', items[i].name);
					if (items[i].cards.length) {
						length = 0;
					} else {
						length = items[i].cards.length;
					};
					li.innerHTML = `<span>${items[i].name}</span>
				<span class="menu__item__num">${length} cards</span>`;
					a.appendChild(li);
					frag.appendChild(a);
					li.addEventListener('click', function(e) {
						hideMenus();
						let clicked = e.target.innerText;
						currentCat.innerText = clicked;
						// Append the content to the DOM

						//	appendCardContent(clicked, items)
					});
					menuInner.appendChild(frag);
				}
			});


			function confirm() {
				const newCatMenuInner = document.getElementById('newCategoryInner');
				let confirmation = document.createElement('span');
				confirmation.setAttribute('class', 'add-category__confirmation');
				confirmation.innerText = `${newCategoryInput.value} category successfully added`;
				newCatMenuInner.appendChild(confirmation);
				const tl = new TimelineLite();
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

		cancelBtn.addEventListener('click', function(e) {
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

})();