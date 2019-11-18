// BUDGET controller ************************************************************************
// ******************************************************************************************
var budgetController = (function() {
	// ----------------
	var Expense = function(id, description, value) {
		this.id = id;
		this.description = description;
		this.value = value;
	};

	var Income = function(id, description, value) {
		this.id = id;
		this.description = description;
		this.value = value;
	};
	// ----------------

	// ----------------
	var calculateTotal = function(type) {
		var sum = 0;
		data.allItems[type].forEach(function(curr) {
			sum += curr.value;
		});
		data.totals[type] = sum;
	};
	// ----------------

	// ----------------
	var data = {
		allItems : {
			expense : [],
			income  : []
		},

		totals   : {
			expense : 0,
			income  : 0
		},

		budget   : 0
	};
	// ----------------

	return {
		// ----------------
		addItem         : function(type, des, val) {
			var newItem, ID;

			// create new ID
			if (data.allItems[type].length > 0) {
				ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
			} else {
				ID = 0;
			}

			// create new item based on income or expense type
			if (type === 'expense') {
				newItem = new Expense(ID, des, val);
			} else if (type === 'income') {
				newItem = new Income(ID, des, val);
			}

			// push new item to the corresponsing data structure
			data.allItems[type].push(newItem);

			// return the new element
			return newItem;
		},
		// ----------------

		// ----------------
		deleteItem      : function(type, id) {
			var ids, index;
			ids = data.allItems[type].map(function(current) {
				return current.id;
			});

			index = ids.indexOf(id);

			if (index !== -1) {
				data.allItems[type].splice(index, 1);
			}
		},
		// ----------------

		// ----------------
		calculateBudget : function() {
			// 1. Calculate total income and expenses
			calculateTotal('income');
			calculateTotal('expense');

			// 2. Calculate the budget : income -budget
			data.budget = data.totals.income - data.totals.expense;

			// 3. Calculate the percentageof income that we spent
		},
		// ----------------

		// ----------------
		getBudget       : function() {
			return {
				budget       : data.budget,
				totalIncome  : data.totals.income,
				totalExpense : data.totals.expense
			};
		},
		// ----------------

		// ----------------
		testing         : function() {
			console.log(data);
		}
		// ----------------
	};
})();
// ******************************************************************************************
// ******************************************************************************************

// UI Controller ****************************************************************************
// ******************************************************************************************
var UIController = (function() {
	var DOMStrings = {
		inputTypeIncome   : document.getElementById('income-button').id,
		inputTypeExpense  : document.getElementById('expense-button').id,
		inputDescription  : document.getElementById('input-description').className,
		inputValue        : document.getElementById('input-value').className,
		inputButton       : document.getElementById('submit-button').id,
		incomeContainer   : '.income-box__items',
		expenseContainer  : '.expense-box__items',
		totalBudgetLabel  : '.output-box__display__screen-value',
		totalIncomeLabel  : '.output-box__display__total--income-value',
		totalExpenseLabel : '.output-box__display__total--expense-value',
		currentDate       : '.output-box__display__date',
		container         : '.container'
	};

	// ----------------
	var formatNumber = function(num, type) {
		var numSplit, int, decimal;

		/*
			+ or - before number 
			exaclty 2 decimal points
			comma seperator
			*/

		num = Math.abs(num);
		num = num.toFixed(2);

		numSplit = num.split('.');

		int = numSplit[0];
		if (int.length > 3) {
			int = int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3, 3);
		}
		decimal = numSplit[1];

		return (type === 'expense' ? '-' : '+') + ' ' + int + '.' + decimal;
	};
	// ----------------

	document.querySelector(DOMStrings.currentDate).textContent = new Date().toLocaleDateString();

	// ----------------
	document.getElementById(DOMStrings.inputTypeIncome).addEventListener('change', function() {
		document.querySelector('.' + DOMStrings.inputDescription).classList.remove('expense-highlight');
		document.querySelector('.' + DOMStrings.inputDescription).classList.add('income-highlight');
		document.querySelector('.' + DOMStrings.inputValue).classList.remove('expense-highlight');
		document.querySelector('.' + DOMStrings.inputValue).classList.add('income-highlight');
	});
	document.getElementById(DOMStrings.inputTypeExpense).addEventListener('change', function() {
		document.querySelector('.' + DOMStrings.inputDescription).classList.remove('income-highlight');
		document.querySelector('.' + DOMStrings.inputDescription).classList.add('expense-highlight');
		document.querySelector('.' + DOMStrings.inputValue).classList.remove('income-highlight');
		document.querySelector('.' + DOMStrings.inputValue).classList.add('expense-highlight');
	});
	// ----------------
	return {
		// ----------------
		getInput       : function() {
			return {
				type        : (function() {
					if (document.getElementById(DOMStrings.inputTypeIncome).checked) {
						return document.getElementById(DOMStrings.inputTypeIncome).value; // will be income
					} else if (document.getElementById(DOMStrings.inputTypeExpense).checked) {
						return document.getElementById(DOMStrings.inputTypeExpense).value; // will be expense
					}
				})(),
				description : document.querySelector('.' + DOMStrings.inputDescription).value,
				value       : parseFloat(document.querySelector('.' + DOMStrings.inputValue).value)
			};
		},
		// ----------------

		// ----------------
		addListItem    : function(obj, type) {
			var html, newHtml, element;

			// create HTML string with placeholder text
			if (type === 'income') {
				element = DOMStrings.incomeContainer;

				html =
					'<div class="income-box__items-1" id="income-%id%"> <span class="income-box__items-1--description">%description%</span> <span class="income-box__items-1--value">%value%</span> <span class="income-box__items-1--delete"><ion-icon name="close-circle"></ion-icon></span> </div>';
			} else if (type === 'expense') {
				element = DOMStrings.expenseContainer;
				html =
					'<div class="expense-box__items-1" id="expense-%id%"> <span class="expense-box__items-1--description">%description%</span> <span class="expense-box__items-1--value">%value%</span> <span class="expense-box__items-1--delete"><ion-icon name="close-circle"></ion-icon></span> </div>';
			}

			// replace placeholder with actual data
			newHtml = html.replace('%id%', obj.id);
			newHtml = newHtml.replace('%description%', obj.description);
			newHtml = newHtml.replace('%value%', formatNumber(obj.value, type));

			// Insert the HTML into DOM
			document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
		},
		// ----------------

		// ----------------
		deleteListItem : function(selectorID) {
			var el = document.getElementById(selectorID);
			el.classList.add('.item-removed');
			el.parentNode.removeChild(el);
		},
		// ----------------

		// ----------------
		clearFields    : function() {
			var fields, fieldsArr;
			fields = document.querySelectorAll('.' + DOMStrings.inputDescription + ', ' + '.' + DOMStrings.inputValue);

			fieldsArr = Array.prototype.slice.call(fields);

			fieldsArr.forEach(function(current, index, array) {
				current.value = '';
				console.log(current.value);
			});

			fieldsArr[0].focus();
		},
		// ----------------

		// ----------------
		displayBudget  : function(obj) {
			document.querySelector(DOMStrings.totalBudgetLabel).textContent = obj.budget;
			document.querySelector(DOMStrings.totalIncomeLabel).textContent = obj.totalIncome;
			document.querySelector(DOMStrings.totalExpenseLabel).textContent = obj.totalExpense;
		},
		// ----------------

		// ----------------
		getDOMStrings  : function() {
			return DOMStrings;
		}
		// ----------------
	};
})();
// ******************************************************************************************
// ******************************************************************************************

// Global APP Controller ********************************************************************
// ******************************************************************************************
var controller = (function(budgetCtrl, UICtrl) {
	// ----------------
	var setupEventListeners = function() {
		var DOM = UICtrl.getDOMStrings();

		document.getElementById(DOM.inputButton).addEventListener('click', ctrlAddItem);
		document.addEventListener('keypress', function(event) {
			if (event.keyCode === 13 || event.which === 13) {
				ctrlAddItem();
			}
		});

		document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);
	};
	// ----------------

	// ----------------
	var updateBudget = function() {
		// 1. Calculate the budget
		budgetCtrl.calculateBudget();

		// 2. Return the budget
		var budget = budgetCtrl.getBudget();

		// 3. Displplay the buget on UI
		UICtrl.displayBudget(budget);
	};
	// ----------------

	// ----------------
	var ctrlAddItem = function() {
		var input, newItem;

		//  1. Get the feild input data
		input = UICtrl.getInput();

		if (input.description !== '' && !isNaN(input.value) && input.value > 0) {
			// 2. Add the item to Budget controller
			newItem = budgetCtrl.addItem(input.type, input.description, input.value);

			// 3. Add the item to UI controller
			UICtrl.addListItem(newItem, input.type);

			// 4. Clear the fields.
			UICtrl.clearFields();

			// 5. Calculate and  update budget
			updateBudget();
		}
	};
	// ----------------

	// ----------------
	var ctrlDeleteItem = function(event) {
		var itemID, splitID, type, ID;
		itemID = event.target.parentNode.parentNode.id;
		if (itemID) {
			// income-1
			splitID = itemID.split('-');
			type = splitID[0];
			ID = parseFloat(splitID[1]);

			//  1. Delete the item from data structure
			budgetCtrl.deleteItem(type, ID);

			//  2. delete the item from UI
			UICtrl.deleteListItem(itemID);

			//  3. Update and show new budget
			updateBudget();
		}
	};
	// ----------------

	return {
		init : function() {
			console.log('App started');

			UICtrl.displayBudget({
				budget       : 0,
				totalIncome  : 0,
				totalExpense : 0
			});
			setupEventListeners();
		}
	};
})(budgetController, UIController);
// ******************************************************************************************
// ******************************************************************************************

controller.init();
