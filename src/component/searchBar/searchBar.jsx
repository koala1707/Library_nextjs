"use client"
import { useState } from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';
import BookTable from "../bookTable/bookTable";


const SearchBar = ({ data }) => {
  // console.log("searchBar-data", data)
  const [searchedBook, setSearchedBook] = useState([])

  return (
    <>
      <Typeahead 
        labelKey="title" 
        onChange={setSearchedBook} 
        options={data} 
        selected={searchedBook}
        placeholder="Search a book..." />
      <BookTable data={data} selected={searchedBook} />
    </>
  )
}

export default SearchBar;