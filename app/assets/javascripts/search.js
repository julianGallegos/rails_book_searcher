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
	debugger
	$(this.resultsContainer).children().remove()
}

View.prototype.getEnteredParams = function(){
	return $(this.bookParams).val();
}

View.prototype.addReturnedResults = function(results){
	console.log("i'm printing from the view")
	for (var i = 0; i < 5; i ++){
			$(this.resultsContainer).append('<li>'+ results.items[i].volumeInfo.title + '</li>')
			$(this.resultsContainer).append('<li>'+ results.items[i].volumeInfo.authors + '</li>')
			$(this.resultsContainer).append('<li>'+ results.items[i].volumeInfo.pageCount + '</li>')
			$(this.resultsContainer).append('<li>'+ results.items[i]['selfLink'] + '</li>')
			$(this.resultsContainer).append('<li><img src=' + results.items[i].volumeInfo.imageLinks.thumbnail + '></li><br><br>')
	}
	// figure out a way to also have link to the reviews for results
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
