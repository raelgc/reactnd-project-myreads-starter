import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
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

  componentDidMount() {
    const { shelves } = this.state;
    BooksAPI.getAll().then((books) => {
      books.map(book => shelves.find(shelf => shelf.id === book.shelf).books.push(book));
      this.setState({ shelves }, () => { console.log(shelves)});
    });
  }

  removeBookFromCurrentShelf = (book) => {
    const shelf = this.state.shelves.find((s) => s.id === book.shelf);
    shelf.books = shelf.books.filter(b => book.id !== b.id);
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
    BooksAPI.update(book, shelf_id).then(() =>
      this.setState((state) => ({ shelves: [...state.shelves] }))
    );
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
