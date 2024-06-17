import { getBooks } from "@/app/page";

export const deleteBook = (id) => {
  console.log("DeleteBook-id", id)
  let res = fetch("http://localhost:3000/api/books", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(id)
  })
  getBooks();
}

// export default deleteBook;
