// BUDGET controller
var budgetController = (function() {
	// some code
})();

// UI Controller
var UIController = (function() {
	var DOMStrings = {
		inputType : (function() {
			var x;
			if (document.getElementById('income-button').checked) {
				x = 'income-button';
			} else if (document.getElementById('expense-button').chcked) {
				x = 'expense-button';
			}
			return x;
		})()
	};
	console.log(DOMStrings.inputType);

	return {
		getInput : function() {
			return {
				type        : document.getElementById(DOMStrings.inputType).value,
				description : document.getElementById('input-description').value,
				value       : document.getElementById('input-value').value
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
	});
})(budgetController, UIController);
