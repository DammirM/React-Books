import React, { useState } from "react";
import BookCreate from "./components/BookCreate";
import BookUpdate from "./components/BookUpdate";

export default function App() {
  const [books, setbooks] = useState([]);
  const [showingCreatedNeBookForm, setShowingCreatedNeBookForm] =
    useState(false);
  const [bookCurrentlyUpdated, setBookCurrentlyUpdated] = useState(null);

  function getBooks() {
    const url = "https://localhost:7026/api/books";

    fetch(url, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setbooks(data.result);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  }

  function deleteBook(bookId){

    const url = `https://localhost:7026/api/book/${bookId}`;

    fetch(url, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        onBookDeleted(bookId);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  }

  return (
    <div className="container">
      <div className="row min-vh-100">
        <div className="col d-flex flex-column justify-content-center align-items-center">
          {(showingCreatedNeBookForm === false && bookCurrentlyUpdated === null) && (
            <div>
              <h1>Books Library</h1>

              <div className="mt-5">
                <button
                  onClick={getBooks}
                  className="btn btn-dark btn-lg w-100"
                >
                  Get Books
                </button>
                <button
                  onClick={() => setShowingCreatedNeBookForm(true)}
                  className="btn btn-secondary btn-lg w-100 mt-4"
                >
                  Create Books
                </button>
              </div>
            </div>
          )}

          {(books.length > 0 &&
            showingCreatedNeBookForm === false && bookCurrentlyUpdated === null)
            && renderBooks()}

          {showingCreatedNeBookForm && (
            <BookCreate onBookCreated={onBookCreated} />
          )}

          {bookCurrentlyUpdated !== null && (
            <BookUpdate
              book={bookCurrentlyUpdated}
              onBookUpdated={onBookUpdated}
            />
          )}
        </div>
      </div>
    </div>
  );

  function renderBooks() {
    return (
      <div className="table-responsive mt-5">
        <table className="table table-bordered border-dark">
          <thead>
            <tr>
              <th scope="col">BookId</th>
              <th scope="col">Titel</th>
              <th scope="col">About</th>
              <th scope="col">Author</th>
              <th scope="col">Year</th>
              <th scope="col">Genre</th>
              <th scope="col">Crud</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.bookId}>
                <th scope="row">{book.bookId}</th>
                <td>{book.titel}</td>
                <td>{book.about}</td>
                <td>{book.author}</td>
                <td>{book.year}</td>
                <td>{book.genre.genreName}</td>
                <td>
                  <button onClick={() => setBookCurrentlyUpdated(book)} className="btn btn-dark btn-lg mx-3 my-3">
                    Update
                  </button>
                  <button onClick={() => { if(window.confirm(`Are  u Sure you want to delete the book "${book.titel}"`)) deleteBook(book.bookId)}} className="btn btn-secondary btn-lg">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          onClick={() => setbooks([])}
          className="btn btn-dark btn lg w-100"
        >
          Empty books array
        </button>
      </div>
    );
  }

  function onBookCreated(createdBook) {
    setShowingCreatedNeBookForm(false);
    if (createdBook === null) {
      return;
    }
    alert(
      `Book Succesfully Created, Press OK "${createdBook.titel}".`
    );
    getBooks();
  }

  function onBookUpdated(updatedBook) {
    setBookCurrentlyUpdated(null);
    if (updatedBook === null) {
      return;
    }

    let booksCopy = [...books];

    const index = booksCopy.findIndex((booksCopyBook, currentIndex) => {
      if (booksCopyBook.bookId === updatedBook.bookId) {
        return true;
      }
    });

    if (index !== -1) {
      booksCopy[index] = updatedBook;
    }

    setbooks(booksCopy);

    alert(`Book Will Update after you click OK "${updatedBook.titel}"`);
  }

  function onBookDeleted(deletedBookBookId) {

    let booksCopy = [...books];

    const index = booksCopy.findIndex((booksCopyBook, currentIndex) => {
      if (booksCopyBook.bookId === deletedBookBookId) {
        return true;
      }
    });

    if (index !== -1) {
      booksCopy.splice(index, 1);
    }

    setbooks(booksCopy);

    alert(`Book Deleted Succesfullt press OK Button`);
  }
}
