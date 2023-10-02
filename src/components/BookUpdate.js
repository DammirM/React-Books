import React, { useState } from "react";

export default function BookUpdate(props) {
  const initialFormData = Object.freeze({
    titel: props.book.titel,
    about: props.book.about,
    author: props.book.author,
    year: props.book.year,
    loan: props.book.loan,
    genreId: props.book.genreId,
    genre: props.book.genre,
  });

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const bookToUpdate = {
      bookId: props.book.bookId,
      titel: formData.titel,
      about: formData.about,
      author: formData.author,
      year: formData.year,
      loan: formData.loan,
      genreId: formData.genreId,
      genre: formData.genre,
    };

    const url = `https://localhost:7026/api/book/${props.book.bookId}`;

    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookToUpdate),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });

    props.onBookUpdated(bookToUpdate);
  };

  return (
    <form className="w-100 px-5">
      <h1 className="mt-5"> Update "{props.book.titel}".</h1>

      <div className="mt-5">
        <label className="h3 form-label">Book Title</label>
        <input
          value={formData.titel}
          name="titel"
          type="text"
          className="form-control"
          onChange={handleChange}
        />
      </div>

      <div className="mt-5">
        <label className="h3 form-label">About</label>
        <input
          value={formData.about}
          name="about"
          type="text"
          className="form-control"
          onChange={handleChange}
        />
      </div>

      <div className="mt-5">
        <label className="h3 form-label">Author</label>
        <input
          value={formData.author}
          name="author"
          type="text"
          className="form-control"
          onChange={handleChange}
        />
      </div>

      <div className="mt-5">
        <label className="h3 form-label">Year</label>
        <input
          value={formData.year}
          name="year"
          type="text"
          className="form-control"
          onChange={handleChange}
        />
      </div>

      <div className="mt-5">
        <label className="h3 form-label">Up For loan</label>
        <input
          name="loan"
          type="checkbox"
          checked={formData.loan}
          className="form-checkbox"
          style={{ width: "35px", height: "25px" }}
          onChange={(e) => {
            setFormData({
              ...formData,
              loan: e.target.checked,
            });
          }}
        />
      </div>

      <div className="mt-5">
        <label className="h3 form-label">GenreID</label>
        <input
          value={formData.genreId}
          name="genreId"
          type="text"
          className="form-control"
          onChange={handleChange}
        />
      </div>

      <button onClick={handleSubmit} className="btn btn-dark btn-lg w-100 mt-5">
        Submit
      </button>
      <button
        onClick={() => props.onBookUpdated(null)}
        className="btn btn-secondary btn-lg w-100 mt-3"
      >
        Cancel
      </button>
    </form>
  );
}
