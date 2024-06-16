import { NextResponse } from "next/server";
import fsPromises from 'fs/promises';
import path from 'path';

const booksPath = path.join(process.cwd(), 'public/database/books.json')

export async function GET() {
  try {
    const res = await fsPromises.readFile(booksPath, 'utf-8');
    const books = JSON.parse(res);
    return NextResponse.json(books)
  } catch (err) {
    return NextResponse.json({ message: "No books" })
  }
}

export async function POST(req) {
  try {
    const res = await fsPromises.readFile(booksPath, 'utf-8');
    const books = JSON.parse(res);
    const { title, owner, borrowed, returned } = await req.json();
    // create random number for id
    const id = books.length + 1;
    // const id = Math.floor(Math.random() * 1000);
    books.push({ id, title, owner, borrowed, returned })

    const updateBooks = JSON.stringify(books);
    await fsPromises.writeFile(booksPath, updateBooks)

    return new NextResponse.json({ message: "New book added successfully!" })
  } catch (err) {
    return NextResponse.json({ message: "No books" })
  }
}

export async function PATCH(req) {
  const res = await fsPromises.readFile(booksPath, 'utf-8');
  const books = JSON.parse(res);
  const { id, borrowed, returned } = await req.json();
  const bookIndex = books.findIndex(book => book.id === id);

  if (bookIndex < 0) {
    return new NextResponse(JSON.stringify({ message: "Book not found!" }),
      { status: 404, headers: { 'content-type': 'application/json' } }
    )
  }
  let book = books[bookIndex];

  book.borrowed = borrowed;
  book.returned = returned;

  books[bookIndex] = book;

  const updatedData = JSON.stringify(books);

  await fsPromises.writeFile(booksPath, updatedData);

  return new NextResponse(
    JSON.stringify({message: "Book updated"}),
    {status: 200, headers: {'content-type': 'application/json'}}
  )
}