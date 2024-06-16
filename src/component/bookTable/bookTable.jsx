"use client"
import "./bookTable.css"
import { useState, useEffect } from 'react'
import Switch from "react-switch";

const BookTable = ({ data, selected }) => {
  // console.log("booktable-data", data)
  const [bookBorrowed, setBookBorrowed] = useState();
  const [bookReturned, setBookReturned] = useState();
  const [updateBookId, setUpdateBookId] = useState();

  const handleToggle = (book) => {
    setBookBorrowed(!book.borrowed)
    setBookReturned(!book.returned)
    setUpdateBookId(book.id)
  }
  const searchBook =
    Array.isArray(data) && selected.length > 0
      ? data.filter(b => (b.title.toLowerCase().includes(selected[0].title.toLowerCase())))
      : []
  const bookList = searchBook.length > 0 ? searchBook : data;

  useEffect(() => {
    if(updateBookId){
      fetch('http://localhost:3000/api/books', {
        method: "PATCH",
        next: { revalidate: 0 },
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({id: updateBookId, borrowed: bookBorrowed, returned: bookReturned})
      })
    }
  },[updateBookId])

  return (
    <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Owner</th>
              <th>Availability</th>
              <th>Borrowed</th>
              <th>Returned</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
      {bookList.map((book, index) => (
            <tr key={`${book.title}-${index}`}>
              <td>{book.title}</td>
              <td>{book.owner}</td>
              <td>{book.returned ? 'Available' : book.borrowed ? 'Unavailable' : null}</td>
              <td> <Switch
                checked={book.borrowed}
                onChange={() => handleToggle(book)}
              /></td>
              <td> <Switch
                checked={book.returned}
                onChange={() => handleToggle(book)}
              /></td>
              <td><button className='delete-btn'>X</button></td>
            </tr>
              ))}
          </tbody>
        </table>
    </div>
  )
}

export default BookTable;