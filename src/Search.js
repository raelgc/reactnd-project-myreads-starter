import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Shelf from './components/Shelf'

// Avoid sending every user keytype to the search API and produce weird results
let searchTimer = null

/**
	The search from BooksAPI is limited to a particular set of search terms.
	You can find these search terms here:
	https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

	However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
	you don't find a specific author or title. Every search is limited by search terms.
*/
export default class Search extends Component {
	state = {
		shelf: {id: 'search', title: 'Search Results', books: []},
	}

	onSearch = (q, shelves) => {
		if (searchTimer != null) {
			clearTimeout(searchTimer);
		}
		searchTimer = setTimeout(() => {
			BooksAPI.search(q.trim()).then((books) => {
				if (!books.error){
					books.map(book => {
						const shelf = shelves.find(shelf => shelf.books.find(b => book.id === b.id));
						if (shelf) {
							book.shelf = shelf.id;
						}
						return book;
					})
					this.setState((state) => ({ shelf: { ...state.shelf, books } } ));
				} else {
					this.setState((state) => ({ shelf: { ...state.shelf, books: [] } } ));
				}
			});
		}, 400);
	}

	render() {
		const { shelves, onChange } = this.props;
		return (
			<div className="search-books">
				<div className="search-books-bar">
					<Link to='/' className="close-search">Close</Link>
					<div className="search-books-input-wrapper">
						<input type="text" placeholder="Search by title or author" onChange={(e) => this.onSearch(e.target.value, shelves)} />
					</div>
				</div>
				<div className="search-books-results">
					<ol className="books-grid"><Shelf shelf={this.state.shelf} onChange={onChange} /></ol>
				</div>
			</div>
		)
	}
}