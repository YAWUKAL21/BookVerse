import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCurrentUser } from "@/services/auth";

const BookCard = ({ book }) => {
  const [isSaved, setIsSaved] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // Get the Open Library work ID (example: "/works/OL12345W")
  const workKey = book.key || "";
  const workId = workKey.replace("/works/", "");

  // Cover image
  const coverImage = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
    : "https://placehold.co/200x300?text=No+Cover";

  useEffect(() => {
    const checkAuth = async () => {
      const user = await getCurrentUser();
      setCurrentUser(user);
      if (user) {
        const savedBooks = JSON.parse(localStorage.getItem("savedBooks") || "{}");
        setIsSaved(savedBooks[user.id]?.some((b) => b.key === book.key) || false);
      }
    };
    checkAuth();
  }, [book.key]);

  const handleSaveToggle = async () => {
    const user = await getCurrentUser();
    if (!user) {
      alert("Please sign in to save books");
      return;
    }

    const savedBooks = JSON.parse(localStorage.getItem("savedBooks") || "{}");
    const userSavedBooks = savedBooks[user.id] || [];

    let updatedBooks;
    if (isSaved) {
      updatedBooks = userSavedBooks.filter((b) => b.key !== book.key);
    } else {
      updatedBooks = [...userSavedBooks, book];
    }

    localStorage.setItem(
      "savedBooks",
      JSON.stringify({
        ...savedBooks,
        [user.id]: updatedBooks,
      })
    );
    setIsSaved(!isSaved);
  };

  return (
    <Card className="w-full max-w-xs hover:shadow-md transition-all duration-200 flex flex-col h-[420px]">
      <CardHeader className="p-3 pb-1 flex-none">
        <div className="relative h-44 w-full mx-auto flex items-center justify-center bg-gray-50 rounded-sm">
          <img
            src={coverImage}
            alt={book.title}
            className="object-contain max-h-full max-w-full"
            loading="lazy"
          />
        </div>
      </CardHeader>

      <CardContent className="p-3 flex-grow">
        <CardTitle className="text-base line-clamp-2">{book.title}</CardTitle>
        <CardDescription className="line-clamp-1 mb-2">
          {book.author_name?.join(", ") || "Unknown Author"}
        </CardDescription>

        {book.subject?.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2">
            {book.subject.slice(0, 2).map((category) => (
              <Badge key={category} variant="outline" className="text-xs">
                {category}
              </Badge>
            ))}
          </div>
        )}

        <p className="text-xs text-gray-500 mt-auto">
          First published: {book.first_publish_year || "N/A"}
        </p>
      </CardContent>

      <CardFooter className="p-3 flex-none flex gap-2">
        <Button variant="outline" className="flex-1" asChild>
          <Link to={`/books/${workId}`}>View Details</Link>
        </Button>

        {currentUser ? (
          <Button
            variant={isSaved ? "default" : "outline"}
            className="flex-1 gap-1"
            onClick={handleSaveToggle}
          >
            {isSaved ? (
              <>
                <BookmarkCheck className="h-4 w-4" /> Saved
              </>
            ) : (
              <>
                <Bookmark className="h-4 w-4" /> Save
              </>
            )}
          </Button>
        ) : (
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => alert("Please sign in to save books")}
          >
            <Bookmark className="h-4 w-4" />
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default BookCard;
