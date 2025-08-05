import { useEffect, useState } from "react";
import { supabase } from "../services/auth";
import { Link } from "react-router-dom";
import BookCard from "../components/BookCard";
import { Input } from "@/components/ui/input";
import { Loader } from "lucide-react";
import { searchBooks } from "@/services/booksApi";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("React");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  // Get logged in user
  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();
  }, []);

  // Fetch books
  const fetchBooks = async (query) => {
    setLoading(true);
    const results = await searchBooks(query);
    setBooks(results);
    setLoading(false);
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

        {!user && (
          <div className="flex justify-end gap-4 mb-6">
            <Link to="/login">
              <button className="bg-blue-500 text-white px-4 py-2 rounded">
                Login
              </button>
            </Link>
            <Link to="/register">
              <button className="bg-green-500 text-white px-4 py-2 rounded">
                Register
              </button>
            </Link>
          </div>
        )}

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
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Search
          </button>
        </form>

        {loading ? (
          <div className="flex justify-center h-40">
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
