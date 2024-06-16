import "./page.css";
import SearchBar from "@/component/searchBar/searchBar";
import Modal from "@/component/modal/modal";

const getBooks = async () => {
  const res = await fetch("http://localhost:3000/api/books", {
    method: 'GET',
    next: { revalidate: 0 }
  });
  return res.json();
  }
  
  export default async function Home() {
  let allBooks = await getBooks();
  // console.log("ALLBOOKS", allBooks)

  return (
    <div className="container">
      <h1>SoS Library</h1>
      <div className="library-container">
      <SearchBar data={allBooks} className="search-bar"/>
      </div>
      <Modal />
    </div>
  )
}