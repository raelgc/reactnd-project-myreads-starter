import React from 'react'

const Book = props => {
	const { book, onChange } = props;
	const { title, authors = [], imageLinks = {}, shelf = 'none' } = book;
	return (
		<div className="book">
		  <div className="book-top">
			<div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${imageLinks.smallThumbnail}")` }}></div>
			<div className="book-shelf-changer">
			  <select defaultValue={shelf} onChange={(e) => onChange(e.target.value, book)}>
					<option disabled>Move to...</option>
					<option value="currentlyReading">Currently Reading</option>
					<option value="wantToRead">Want to Read</option>
					<option value="read">Read</option>
					<option value="none">None</option>
			  </select>
			</div>
		  </div>
			<div className="book-title">{title}</div>
			<div className="book-authors">{authors.join("\n")}</div>
		</div>
	)
}

export default Book
