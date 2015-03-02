class SearchController < ApplicationController

def search_books
	books_to_search = params[:books_to_search]
	url = "https://www.googleapis.com/books/v1/volumes?q=#{books_to_search}"
	response = HTTParty.get(url)

	render json: response
end

def index
	
end

end
