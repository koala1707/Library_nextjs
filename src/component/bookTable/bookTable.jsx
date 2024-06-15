"use client"
import "./bookTable.css"
import { useState } from 'react'
import Switch from "react-switch";

const BookTable = ({ data, selected }) => {
  // console.log("booktable-data", data)
  const [checked, setChecked] = useState();

  const handleToggle = () => {
    setChecked(!checked);
  }
  const searchBook =
    Array.isArray(data) && selected.length > 0
      ? data.filter(b => (b.title.toLowerCase().includes(selected[0].title.toLowerCase())))
      : []
  const bookList = searchBook.length > 0 ? searchBook : data;

  return (
    <div className="table-container">
      {bookList.map((book, index) => (
        <table key={`table-${index}`}>
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
            <tr key={`${book.title}-${index}`}>
              <td>{book.title}</td>
              <td>{book.owner}</td>
              <td>{book.returned ? 'Available' : book.borrowed ? 'Unavailable' : null}</td>
              <td> <Switch
                checked={book.borrowed}
                onChange={handleToggle}
              /></td>
              <td> <Switch
                checked={book.returned}
                onChange={handleToggle}
              /></td>
              <td><button className='delete-btn'>X</button></td>
            </tr>
          </tbody>
        </table>
      ))}
    </div>
  )
}

export default BookTable;