// src/services/booksApi.js
import axios from "axios";

const BASE_URL = "https://openlibrary.org";

// Search books
export const searchBooks = async (query) => {
  try {
    const res = await axios.get(`${BASE_URL}/search.json`, {
      params: { q: query, limit: 20 },
    });
    return res.data.docs || [];
  } catch (error) {
    console.error("Error searching books:", error.message);
    return [];
  }
};

// Get single book details
export const getBookById = async (bookId) => {
  try {
    const res = await axios.get(`${BASE_URL}/works/${bookId}.json`);
    const bookData = res.data;

    // Get author names
    if (bookData?.authors && Array.isArray(bookData.authors)) {
      const authorNames = await Promise.all(
        bookData.authors.map(async (a) => {
          try {
            const authorRes = await axios.get(`${BASE_URL}${a.author.key}.json`);
            return authorRes.data.name;
          } catch {
            return "Unknown Author";
          }
        })
      );
      bookData.author_names = authorNames;
    }

    return bookData;
  } catch (error) {
    console.error("Error fetching book by ID:", error.message);
    return null;
  }
};

// Get books by subject
export const getBooksBySubject = async (subject) => {
  try {
    const res = await axios.get(`${BASE_URL}/search.json`, {
      params: { subject: subject, limit: 20 },
    });
    return res.data.docs || [];
  } catch (error) {
    console.error("Error fetching books by subject:", error.message);
    return [];
  }
};
