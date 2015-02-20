// =============models================




// =============view================
function View(){
	this.bookParams = '#searchParams';
	this.searchButton = "#button";
	this.resetbutton = "#reset";
	this.resultsContainer = ".search_results"
}

View.prototype.clearViewResults = function(){
	console.log("reseting your stuff yo")
}

View.prototype.getEnteredParams = function(){
	return $(this.bookParams).val();
}

View.prototype.addReturnedResults = function(results){
	console.log("i'm printing from the view")
	for (var i = 0; i < 5; i ++){
			console.log(results.items[i].volumeInfo.title)
			console.log(results.items[i].volumeInfo.authors)
			console.log(results.items[i].volumeInfo.pageCount)
	}
	// use this method to append results from google books to ul
}

// =============controller================

function Controller(view){
	this.view = view;
}

Controller.prototype.enterSearchTerms = function(){
	//keeps scope of controller in ajax call
	var controllerScope = this;
	console.log("making ajax call");
	
	this.view.getEnteredParams();
	var requestToGoogleBooks = $.ajax({
		url: "/search",
		type: "POST",
		data: {books_to_search: encodeURIComponent(this.view.getEnteredParams())},
		dataType: "json"
	});
	requestToGoogleBooks.done(function(event){
		// console.log("printing results")
		console.log(event)
		// for (var i = 0; i < 5; i++){

		// 	console.log(event.items[i].volumeInfo.title)
		// 	console.log(event.items[i].volumeInfo.authors)
		// 	console.log(event.items[i].volumeInfo.pageCount)
		// }
		controllerScope.view.addReturnedResults(event)
	})
}

Controller.prototype.resetSearch = function(){
	this.view.clearViewResults();
}


Controller.prototype.bindEventHandlers = function(){
	$(this.view.searchButton).on('click', this.enterSearchTerms.bind(this));
	$(this.view.resetbutton).on('click', this.resetSearch.bind(this));
}

$(document).ready(function(){
	var myGoogleBooks = new Controller(new View());
	myGoogleBooks.bindEventHandlers();
})
