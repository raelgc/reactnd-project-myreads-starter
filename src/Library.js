import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Shelf from './components/Shelf'

export default class Library extends Component {
	
	render() {
		const { shelves, onChange } = this.props;
		return (
			<div className="list-books">
				<div className="list-books-title">
					<h1>MyReads</h1>
				</div>
				<div className="list-books-content">
					<div>
						{shelves.map(shelf => <Shelf key={shelf.id} shelf={shelf} onChange={onChange} />)}                
					</div>
				</div>
				<div className="open-search">
					<Link to='/search'>Add a book</Link>
				</div>
			</div>
		)
	}
}