// BUDGET controller
var budgetController = (function() {
	// some code
})();

// UI Controller
var UIController = (function() {
	var DOMStrings = {
		inputTypeIncome  : document.getElementById('income-button').id,
		inputTypeExpense : document.getElementById('expense-button').id,
		inputDescription : document.getElementById('input-description').id,
		inputValue       : document.getElementById('input-value').id
	};

	return {
		getInput : function() {
			return {
				type        : (function() {
					if (document.getElementById(DOMStrings.inputTypeIncome).checked) {
						return document.getElementById(DOMStrings.inputTypeIncome).value;
					} else if (document.getElementById(DOMStrings.inputTypeExpense).checked) {
						return document.getElementById(DOMStrings.inputTypeExpense).value;
					}
				})(),
				description : document.getElementById(DOMStrings.inputDescription).value,
				value       : document.getElementById(DOMStrings.inputValue).value
			};
		}
	};
})();

// Global APP Controller
var controller = (function(budgetCtrl, UICtrl) {
	var ctrlAddItem = function() {
		//  1. Get the feild input data
		var input = UIController.getInput();
		console.log(input);

		// 2. Add the item to Budget controller
		// 3. Add the item to UI controller
		// 4. Calculate the budget
		// 5. Displplay the buget on UI
	};

	document.querySelector('.output-box__entry__submit').addEventListener('click', ctrlAddItem);

	document.addEventListener('keypress', function(event) {
		if (event.keyCode === 13 || event.which === 13) {
			ctrlAddItem();
		}
		console.log(event.keyCode);
	});
})(budgetController, UIController);
