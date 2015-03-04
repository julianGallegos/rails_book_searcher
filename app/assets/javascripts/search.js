// =============models================

// make a library section
// the user should be able to click on a button and add that book to their
function Model(){
	this.libaray = []
}

Model.prototype.addBookToLibarayArray = function(){
	console.log("Pushing book into libaray array")
}

// =============view================
function View(){
	this.bookParams = '#searchParams';
	this.searchButton = "#button";
	this.resetbutton = "#reset";
	this.resultsContainer = ".search_results"
	this.libraryButton = ".libraryButton"
}

View.prototype.clearViewResults = function(){
	console.log("reseting your stuff yo")
	
	$(this.resultsContainer).children().remove()
}

View.prototype.getEnteredParams = function(){
	return $(this.bookParams).val();
}

View.prototype.addToLibrary = function(){
	console.log("adding to the library")
}

View.prototype.addReturnedResults = function(results){
	console.log("i'm printing from the view")
	
	console.log(results.items[0])
	for (var i = 0; i < 5; i ++){
			$(this.resultsContainer).append('<li>'+ results.items[i].volumeInfo.title + '</li>')
			$(this.resultsContainer).append('<li>'+ results.items[i].volumeInfo.authors + '</li>')
			$(this.resultsContainer).append('<li>'+ results.items[i].volumeInfo.pageCount + '</li>')
			// $(this.resultsContainer).append('<li>'+ results.items[i]['selfLink'] + '</li>')
			$(this.resultsContainer).append('<li><a href=' + results.items[i]['volumeInfo']['canonicalVolumeLink'] + '><img src=' + results.items[i].volumeInfo.imageLinks.thumbnail + '></a></li><br>')
			$(this.resultsContainer).append('<button class="libraryButton btn btn-info btn-sm" type="button">Add to Library</button><br><br>')
						
	}
}

// =============controller================

function Controller(model, view){
	this.model = model
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
		controllerScope.createLibraryButtonHandler();
	})
}

Controller.prototype.resetSearch = function(){
	this.view.clearViewResults();
}

Controller.prototype.createLibraryButtonHandler = function(){
	$(this.view.libraryButton).on('click', this.addLibraryBook.bind(this));
}

Controller.prototype.addLibraryBook = function(){
	this.view.addToLibrary();
	this.model.addBookToLibarayArray();
}


Controller.prototype.bindEventHandlers = function(){
	$(this.view.searchButton).on('click', this.enterSearchTerms.bind(this));
	$(this.view.resetbutton).on('click', this.resetSearch.bind(this));
}

$(document).ready(function(){
	var myGoogleBooks = new Controller(new Model(),new View());
	myGoogleBooks.bindEventHandlers();
})
