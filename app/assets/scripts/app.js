window.onload = (function init() {


	/**
	 *  MODEL
	 */

	(function model() {

			var db;

			function _setupDatabase() {
				return "indexedDB" in window;
			};

			function _addNewCategory(e) {
				var name = newCategoryInput.value;
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

				request.onerror = function(e) {
					console.log("Error", e.target.error.name);
					//some type of error handler
				};

				request.onsuccess = function(e) {
					console.log("Woot! Did it");
				};
			};

			function _checkDomLoaded() {

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
				};

				/*
	Get all cards in the database (not filtered)
	 */

				function _getCards(callback) {
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

					};
				};

				function _addNewCard(items) {

					current = currentCat.innerText;
					let cardsArr;
					// Get the current category depending on which menu item was clicked
					console.log('Unfiltered: ' + items)
					for (let i = 0; i < items.length; i++) {
						if (items[i].name === current) {
							cardsArr = items[i].cards;
							console.log(cardsArr)

							console.log('Added card!');
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
				};

				function _deleteEverything() {
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

				function _deleteRecord(variable) {
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


				return {
					setupDatabase: _setupDatabase,
					addNewCategory: _addNewCategory,
					checkDomLoaded: _checkDomLoaded,
					getCards: _getCards,
					addNew: _addNewCard,
					deleteRecord: _deleteRecord,
					deleteEverything: _deleteEverything
				}

			})();


		/**
		 *  CONTROLLER
		 */

		(function controller() {


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
				const leftBtn = document.getElementById('leftBtn');
				const rightBtn = document.getElementById('rightBtn');
				const noCardsMsg = document.getElementById('no-cards-message');
				const grid = document.getElementById('gridOverlay');

				function _addEvents() {
					document.addEventListener("DOMContentLoaded", _openDatabase);

					leftBtn.addEventListener('click', function() {
						if (currentCards.length > 1) {
							TweenLite.to(cardContent, 1, {
								x: -300,
								opacity: 0,
								onComplete: prevCard
							});
						} else {
							return;
						}
					}, false);


					rightBtn.addEventListener('click', function() {
						if (currentCards.length > 1) {
							TweenLite.to(cardContent, 1, {
								x: -300,
								opacity: 0,
								onComplete: nextCard
							})
						} else {
							return;
						}
					}, false);
				}


				
				return {
					start: () => {
						updateView.introAnimation();
					}
				}



				_addEvents();

			})();



			(function() {
				let current, currentCards, catIndex, allItems;
				let cardIndex = 0;

				const _getAllItems = function _getAllItems() {
					console.log(allItems)
					return allItems;
				}
				const _setAllItems = function _setAllItems(items) {
					allItems = items;
				}
				return {
					getAllItems: _getAllItems,
					setAllItems: _setAllItems
				}

			})(); console.log(model.getAllItems())

			// Expand textarea when filled with content
			newCardInput.onkeyup = function(e) {
				console.log(this)
				if (this.clientHeight < this.scrollHeight) {
					this.style.height = this.scrollHeight + 'px';
				}
			};


			/*
			Code to create the database that will store the decks
			*/
			let flashcardsDB = (function() {
				let flashcardsDB = {};
				let datastore = null;

				// flashcards: Add methods for interacting with the database here.

				// Export the tDB object.
				return flashcardsDB;
			}());



			/**
			 *  VIEW
			 */


			(function updateView() {

				function _introAnimation() {
					const filler = document.getElementById('filler');
					const fillerHolder = document.getElementById('filler-holder');
					const introText = document.getElementById('intro__title');
					TweenLite.to(introText, 0, {
						opacity: 1,
						delay: 0.8
					});
					TweenLite.to(introText, 0, {
						opacity: 0,
						delay: 3.4
					});
					TweenLite.to(fillerHolder, 0, {
						display: 'none',
						delay: 3.8
					});
					tl2.to(filler, 0.6, {
							width: '100%',
							ease: Power1.easeOut
						})
						.to(filler, 0.6, {
							width: '0px',
							right: '0',
							left: 'auto',
							ease: Circ.easeOut,
							delay: 0.2
						})
						.to(filler, 0.4, {
							width: '100%',
							ease: Circ.easeOut,
							delay: 1.5
						})
						.to(filler, 0.2, {
							width: '0px',
							left: '0',
							right: 'auto',
							ease: Circ.easeOut,
							delay: 0.1
						});
				}

				return {
					introAnimation: _introAnimation
				}

			})();







			/*
			Show all categories as a grid
			 */
			function showCardsGrid() {
				// Intro animation

				let tl = new TimelineLite();
				let tl2 = new TimelineLite({
					onComplete: buildGridMenu
				});
				let frag = document.createDocumentFragment();
				let menuInner = document.getElementById('menu-inner');
				const addFirstCat = document.getElementById('add-first-cat');



				/*
				If there are items in the database, append them to the grid
				 */
				function buildGridMenu() {

					if (allItems.length === 0) {
						TweenLite.to(noCardsMsg, 0.7, {
							display: 'block',
							opacity: 1,
							y: -15,
							delay: 0.6
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
						//	grid.addEventListener('click', hideCardsGrid, false);

						for (obj in allItems) {
							if (allItems[obj].hasOwnProperty('name')) {
								let a = document.createElement('a');
								let li = document.createElement('li');

								li.setAttribute('class', 'grid__item');
								li.innerText = allItems[obj].name;
								if (li.innerText !== '') {

									a.addEventListener('click', function(e) {

										// Show menu transition
										menuTransition();
										// Fetch cards
										fetchCards(this.innerText.trim());
										hideCardsGrid();
										// Append the content to the DOM
										//	appendCardContent(clicked, allItems);


									})
								} else {
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
			};



			submitCardBtn.addEventListener('click', function(e) {
				/*
				Grab all the cards from the database
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
		};

		openRequest.onsuccess = function(e) {
			console.log("Connected to database");
			db = e.target.result;

			/**
			 * Grab all the cards from the database
			 */

			flashcardsDB.getCards(function(items) {
				console.log(model.getAllItems())
				model.setAllItems(items);
				console.log(model.getAllItems())
					// Display all categories as a grid
				showCardsGrid(items);

				// Update menus
				updateCategoryMenu(items);

			});

			openRequest.onerror = function(e) {
				Alert('Error accessing the database');
				//Do something for the error
			}

		}, false);



	/*
			Takes in the selected category and gets all the cards for that category from the database
			 */
	function fetchCards(clicked, callback) {
		current = clicked;
		console.log('Fetching cards...');
		if (current) {
			// Loop through items to find current category
			var x;
			allItems.forEach(function(i) {
				x = i.name;
				if (x === current) {
					content = i.cards[0];
					catIndex = i;
					currentCards = i.cards;
					appendCardContent(current, currentCards, cardIndex);
				}
			});
		} else {
			appendCardContent(current, null, null);
		}

	};



	/**
	 * Appends the cards found in the fetchCards function to the DOM
	 * @param  {String} clicked    The current category
	 * @param  {Number} currentCards.length Total number of cards in the array for the current category
	 * @param  {Number} cardIndex Index of the selected card within the cards array
	 */
	function appendCardContent(clicked, currentCards, cardIndex) {

		console.log('Running appendCardContent');
		if (clicked) {
			currentCat.innerText = clicked;
		} else if (!clicked) {
			currentCat.innerText = '-';
		}
		if (currentCards.length > 0) {
			fcNum.innerText = '0' + (cardIndex + 1);
			cardContent.innerHTML = currentCards[0];
			leftBtn.style.opacity = 1;
			rightBtn.style.opacity = 1;
		} else if (currentCards.length === 0 || currentCards === 'undefined') {
			console.log('yo')
			cardContent.innerHTML = "<p>No cards.Add something.</p>";
			leftBtn.style.opacity = 0.2;
			rightBtn.style.opacity = 0.2;
		} else {
			leftBtn.style.opacity = 1;
			rightBtn.style.opacity = 1;
		}

		document.body.onkeyup = function(e) {
			if (e.keyCode === 37 && currentCards.length > 1) {
				TweenLite.to(cardContent, 1, {
					x: -300,
					opacity: 0,
					onComplete: prevCard
				});
			} else if (e.keyCode === 39 && currentCards.length > 1) {
				TweenLite.to(cardContent, 1, {
					x: -300,
					opacity: 0,
					onComplete: nextCard
				})
			} else {
				return;
			}
		}

	};

	/**
	 * Gets a random number within a range
	 * @param  {number} min The lower end of the range
	 * @param  {number} max The upper end of the range
	 * @return {number}     A random number between the two given parameters
	 */
	function getRandomInt(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min)) + min;
	};

	/*
	Go to the next card in the array
	*/

	function nextCard() {
		console.log('Running nextCard');
		if (cardIndex < currentCards.length - 1) {
			cardIndex++;
			cardContent.innerText = catIndex.cards[cardIndex];
			if (cardIndex < 9) {
				fcNum.innerText = '0' + (cardIndex + 1);
				TweenLite.to(cardContent, 1, {
					x: 300,
					opacity: 1
				});
			} else {
				fcNum.innerText = (cardIndex + 1);
				TweenLite.to(cardContent, 1, {
					x: 300,
					opacity: 1
				});
			}
		} else if (cardIndex === currentCards.length - 1) {
			cardIndex = 0;
			cardContent.innerText = catIndex.cards[cardIndex];
			fcNum.innerText = '0' + (cardIndex + 1);
			TweenLite.to(cardContent, 1, {
				x: 300,
				opacity: 1
			});
		}
	}


	// Grab the previous card in the array
	function prevCard() {
		console.log('running prevCard')
		if (cardIndex > 0) {
			cardIndex -= 1;
			cardContent.innerText = catIndex.cards[cardIndex];
			if (cardIndex < 9) {
				fcNum.innerText = '0' + (cardIndex + 1);
				TweenLite.to(cardContent, 1, {
					x: 300,
					opacity: 1
				})
			} else {
				fcNum.innerText = (cardIndex + 1);
				leftBtn.css = ('opacity: 0.1')
				TweenLite.to(cardContent, 1, {
					x: 300,
					opacity: 1
				})
			}
		} else if (cardIndex === 0) {
			cardIndex = currentCards.length - 1;
			cardContent.innerText = catIndex.cards[cardIndex];
			if (cardIndex < 9) {
				fcNum.innerText = '0' + (cardIndex + 1);
				TweenLite.to(cardContent, 1, {
					x: 300,
					opacity: 1
				})
			} else {
				fcNum.innerText = (cardIndex + 1);
				leftBtn.css = ('opacity: 0.1')
				TweenLite.to(cardContent, 1, {
					x: 300,
					opacity: 1
				})
			}
		}
	};

	function showMenus() {

		document.body.onkeyup = function(e) {
			if (e.keyCode === 37 && currentCards.length > 1) {
				return;
			} else if (e.keyCode === 39 && currentCards.length > 1) {
				return;
			}
		};

		const tl = new TimelineLite();
		const tl2 = new TimelineLite();

		flashcardsDB.getCards(function(items) {
			updateCategoryMenu(items);
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

	};

	function hideMenus() {

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
			onComplete: function() {
				menuInner.innerHTML = '';
				updateCategoryMenu(allItems);
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

	};

	/*
	Show the menu transition animation
	 */
	function menuTransition() {

		const slider = document.getElementById('menu-transition');
		const tl = new TimelineLite();
		console.log('Running transition')
		tl.to(slider, 0.3, {
				width: '100vw'
			})
			.to(slider, 0.7, {
				opacity: 0,
				delay: 0.3
			})
			.to(slider, 0, {
				width: '0px',
				opacity: 1
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
	};

	// Display the page to add a new category
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

		});

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
	};

	// Display the page to add a new card to the current category
	function showCardInput() {
		current = currentCat.innerText;
		const tl = new TimelineLite();
		const addCardMenu = document.getElementById("tertiary-menu-two");
		addCardLabel.innerText = `Add a new card to ${current}:`;
		backBtn2.addEventListener('click', function(e) {
			TweenLite.to(addCardMenu, 0, {
				display: 'none'
			});
			menuTransition();
			setTimeout(showMenus, 1500);

		});

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
	};



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

	};
	/**
	 * Updates the category list with all categories in the database
	 * @param  {object} items The object store from the database
	 * @return {[type]}       [description]
	 */
	function updateCategoryMenu(items) {
		let menuInner = document.getElementById('menu-inner');
		menuInner.innerHTML = '';
		let frag = document.createDocumentFragment();
		for (let i = 0; i < items.length; i++) {
			let a = document.createElement('a');
			let li = document.createElement('li');
			let length;
			li.setAttribute('class', 'menu__item');
			li.setAttribute('data-category', items[i].name);
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
				e.stopPropagation();
				menuTransition();
				// Fetch cards
				const _this = this.getAttribute('data-category');
				setTimeout(function() {
					fetchCards(_this);
					showMenus();
				}, 1000);
				// Show the menu again

				// Append content to the DOM
				//	appendCardContent(clicked, items);

			});
		}
		menuInner.appendChild(frag);
		catMenu.setAttribute('class', 'relational-menu')
	}


	// Add event listeners
	menuBtn.addEventListener('click', showMenus, false);
	menuOverlay.addEventListener('click', hideMenus, false);

	addCategoryBtn.addEventListener('click', function(e) {
		e.stopPropagation();
		showCategoryInput();
	});

	addCardBtn.addEventListener('click', function(e) {
		e.stopPropagation();
		showCardInput();
	});



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

		modalOverlay.addEventListener('click', function() {
			e.stopPropagation();
			TweenLite.to(modalOverlay, 0.2, {
				display: 'none'
			}, false);
		});

		confirmBtn.addEventListener('click', function(e) {
			e.stopPropagation();
			flashcardsDB.getCards(function(items) {
				console.log('Running getCards callback');

				flashcardsDB.addNewCategory();
				updateCategoryMenu(allItems);
			});

			// Show a confirmation message when new category is added
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

		// Close the modal
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