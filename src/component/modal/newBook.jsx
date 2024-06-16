import getBooks from "../../app/page"

const NewBook = ({newBook, handleModal}) => {
  const handleSubmit = () => {

    let res = fetch('http://localhost:3000/api/books', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBook),
      
    })
    res.then(r => {
      if(r.ok) {
        console.log("headers",r.headers);
        // close a modal
        handleModal();
        // update a book list
        getBooks();
      }
    })
  
  }
  return(
    <button onClick={handleSubmit}>Submit</button>
  )
}

export default NewBook;