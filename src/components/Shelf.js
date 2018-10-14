import React from 'react'
import Book from '../components/Book'

const Shelf = props => {
	const { shelf, onChange } = props
	const { title, books } = shelf
	return (
		<div className="bookshelf">
			<h2 className="bookshelf-title">{title}</h2>
			<div className="bookshelf-books">
				<ol className="books-grid search-books-results">
					{books.length ?
						books.map(book => <li key={book.id}><Book book={book} onChange={onChange} /></li>)
					:
						<li className="shelf-empty">No books found</li>
					}
				</ol>
			</div>
		</div>
	)
}

export default Shelf
