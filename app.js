// BUDGET controller ******************************************************************
var budgetController = (function() {
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

	var data = {
		allItems : {
			expense : [],
			income  : []
		},

		totals   : {
			expense : 0,
			income  : 0
		}
	};

	return {
		addItem : function(type, des, val) {
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

		testing : function() {
			console.log(data);
		}
	};
})();
// ******************************************************************************************

// UI Controller ****************************************************************************
var UIController = (function() {
	var DOMStrings = {
		inputTypeIncome  : document.getElementById('income-button').id,
		inputTypeExpense : document.getElementById('expense-button').id,
		inputDescription : document.getElementById('input-description').id,
		inputValue       : document.getElementById('input-value').id,
		inputButton      : document.getElementById('submit-button').id,
		incomeContainer  : '.income-box__items',
		expenseContainer : '.expense-box__items'
	};

	return {
		getInput      : function() {
			return {
				type        : (function() {
					if (document.getElementById(DOMStrings.inputTypeIncome).checked) {
						return document.getElementById(DOMStrings.inputTypeIncome).value; // will be income
					} else if (document.getElementById(DOMStrings.inputTypeExpense).checked) {
						return document.getElementById(DOMStrings.inputTypeExpense).value; // will be expense
					}
				})(),
				description : document.getElementById(DOMStrings.inputDescription).value,
				value       : document.getElementById(DOMStrings.inputValue).value
			};
		},

		addListItem   : function(obj, type) {
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
			newHtml = newHtml.replace('%value%', obj.value);

			// Insert the HTML into DOM
			document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
		},

		clearFields   : function() {
			var fields;
			fields = document.querySelectorAll(DOMStrings.inputDescription + ',' + DOMStrings.inputValue);
		},

		getDOMStrings : function() {
			return DOMStrings;
		}
	};
})();
// ******************************************************************************************

// Global APP Controller ********************************************************************
var controller = (function(budgetCtrl, UICtrl) {
	var setupEventListeners = function() {
		var DOM = UICtrl.getDOMStrings();

		document.getElementById(DOM.inputButton).addEventListener('click', ctrlAddItem);

		document.addEventListener('keypress', function(event) {
			if (event.keyCode === 13 || event.which === 13) {
				ctrlAddItem();
			}
		});
	};

	var ctrlAddItem = function() {
		var input, newItem;

		//  1. Get the feild input data
		input = UICtrl.getInput();

		// 2. Add the item to Budget controller
		newItem = budgetCtrl.addItem(input.type, input.description, input.value);

		// 3. Add the item to UI controller
		UICtrl.addListItem(newItem, input.type);
		// 4. Calculate the budget
		// 5. Displplay the buget on UI
	};

	return {
		init : function() {
			console.log('App started');
			setupEventListeners();
		}
	};
})(budgetController, UIController);
// ******************************************************************************************

controller.init();
