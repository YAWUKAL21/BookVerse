import { useEffect, useState } from "react";
import { supabase } from "../services/auth";
import {  Link } from "react-router-dom";
import axios from "axios";
import BookCard from "../components/BookCard";
import { Input } from "@/components/ui/input"; // ShadCN UI
import { Loader } from "lucide-react"; // Optional loading spinner

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("React");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  // Check login status
  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();
  }, []);

  // Fetch books
  const fetchBooks = async (query) => {
    try {
      setLoading(true);
      const res = await axios.get(
        `https://openlibrary.org/search.json?q=${query}`
      );
      setBooks(res.data.docs.slice(0, 20));
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks(searchTerm);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      fetchBooks(searchTerm);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6">📚 BookVerse</h1>

        {/* Auth Buttons */}
        {!user && (
          <div className="flex justify-center gap-4 mb-6">
            <Link to="/login">
              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
                Login
              </button>
            </Link>
            <Link to="/register">
              <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition">
                Register
              </button>
            </Link>
          </div>
        )}

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex gap-2 mb-8">
          <Input
            type="text"
            placeholder="Search by title or author..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Search
          </button>
        </form>

        {/* Book Results */}
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <Loader className="animate-spin w-6 h-6 text-blue-600" />
          </div>
        ) : books.length > 0 ? (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {books.map((book) => (
              <BookCard key={book.key} book={book} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">No books found.</p>
        )}
      </div>
    </div>
  );
}