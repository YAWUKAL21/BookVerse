import { useEffect, useState } from "react";
import { BookCard } from "../components/BookCard";
import { Button } from "@/components/ui/button";
import { getCurrentUser } from "../services/auth";

export function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFavorites = async () => {
      const user = await getCurrentUser();
      if (user) {
        const savedBooks = JSON.parse(localStorage.getItem('savedBooks') || '{}');
        setFavorites(savedBooks[user.id] || []);
      }
      setLoading(false);
    };

    loadFavorites();
  }, []);

  if (loading) {
    return <div className="container py-8">Loading favorites...</div>;
  }

  if (favorites.length === 0) {
    return (
      <div className="container py-8 flex flex-col items-center justify-center h-64">
        <p className="text-lg text-muted-foreground mb-4">
          You haven't saved any books yet
        </p>
        <Button asChild>
          <Link to="/">Browse Books</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">Your Favorite Books</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {favorites.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
}