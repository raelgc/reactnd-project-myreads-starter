import React from 'react'
import { Route } from 'react-router-dom'
import './App.css'
import Library from './Library'
import Search from './Search'

// TODO: colocar os propTypes


export default class BooksApp extends React.Component {
  state = {
    shelves: [
      {id: 'currentlyReading', title: 'Currently Reading', books: []},
      {id: 'wantToRead', title: 'Want to Read', books: []},
      {id: 'read', title: 'Read', books: []},
    ]
  }

  removeBookFromCurrentShelf = (book) => {
    const shelf = this.state.shelves.find((s) => s.id === book.shelf);
    shelf.books.splice(shelf.books.find(b => book.id === b.id), 1);
  }

  moveToShelf = (shelf_id, book) => {
    const shelf = this.state.shelves.find((shelf) => shelf.id === shelf_id);
    shelf.books.push({ ...book, shelf: shelf_id });
  }

  onChange = (shelf_id, book) => {
    if (book.shelf) {
      this.removeBookFromCurrentShelf(book);
    }
    if (shelf_id !== 'none') {
      this.moveToShelf(shelf_id, book);
    }
    this.setState((state) => ({ shelves: [...state.shelves] }));
  }

  render() {
    const { shelves } = this.state;
    return (
      <div className="app">
        <Route exact path='/' render={() => <Library shelves={shelves} onChange={this.onChange} />} />
        <Route path='/search' render={() => <Search shelves={shelves} onChange={this.onChange} />} />
      </div>
    )
  }
}
