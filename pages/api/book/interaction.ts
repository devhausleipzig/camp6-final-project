// package imports
import { Prisma } from "@prisma/client";

// local imports
import { prisma } from "../../../prisma/db";
import { PutBook } from "./model.zod";

export async function createBook(data) {
  try {
    const bookModel = await prisma.book.create({
      data: {
        ...data,
      },
    });
    return bookModel;
  } catch (err) {
    console.log(err);
  }
}

type Clauses = Array<Prisma.BookWhereInput>;

export async function retrieveBooks({
  clauses,
  orderBy,
}: {
  clauses: Clauses;
  orderBy?: string;
}) {
  const bookModels = await prisma.book.findMany({
    where: {
      AND: clauses,
    },
    orderBy: orderBy && orderBy != "" ? { [orderBy]: "desc" } : undefined,
  });
  return bookModels;
}

export async function retrieveBook(bookId) {
  const bookModel = await prisma.book.findFirstOrThrow({
    where: { identifier: bookId },
  });
  return bookModel;
}

export async function updateBook(bookId: string, data: PutBook) {
  const updatedBook = await prisma.book.update({
    where: {
      identifier: bookId,
    },
    data: data,
  });
  return updatedBook;
}

export async function deleteBook(bookId) {
  const deletedBook = await prisma.book.delete({
    where: {
      identifier: bookId,
    },
  });
  return deletedBook;
}

export async function searchBookLanguages() {
  const languages = await prisma.book.groupBy({
    by: ["language"],

    _count: { language: true },
    orderBy: { _count: { language: "desc" } },
  });
  return languages;
}
