"use client"
import "./bookTable.css"
import { useState, useEffect } from 'react'
import Switch from "react-switch";
import { getBooks } from "../../app/page";
import { deleteBook } from "../deleteBook/deleteBook";
import { useRouter } from "next/navigation";


const BookTable = ({ data, selected }) => {
  const router = useRouter();
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
      let res = fetch('http://localhost:3000/api/books', {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({id: updateBookId, borrowed: bookBorrowed, returned: bookReturned})
      })
      res.then(r => {
        if(r.ok) {
          // update a book list
          getBooks();
        }
      })
    }
    setUpdateBookId(false);
    router.push("http://localhost:3000/");
    router.refresh();
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
              <td><button className='delete-btn' onClick={() => deleteBook(book.id)}>X</button></td>
            </tr>
              ))}
          </tbody>
        </table>
    </div>
  )
}

export default BookTable;