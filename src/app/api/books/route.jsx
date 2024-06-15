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