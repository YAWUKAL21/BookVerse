import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getBookById } from "@/services/booksApi";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

export function BookDetails() {
  const { id } = useParams(); // Should be something like /works/OL12345W
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const data = await getBookById(id);
        setBook(data);
      } catch (err) {
        setError(err.message || "Failed to load book details");
      } finally {
        setLoading(false);
      }
    };
    fetchBookDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto py-8">
        <Skeleton className="h-10 w-3/4 mb-4" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-8">
        <Alert variant="destructive">
          <ExclamationTriangleIcon className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="container mx-auto py-8">
        <Alert>
          <AlertTitle>Book not found</AlertTitle>
          <AlertDescription>The requested book could not be found.</AlertDescription>
        </Alert>
      </div>
    );
  }

  const coverImage = book.covers?.length
    ? `https://covers.openlibrary.org/b/id/${book.covers[0]}-L.jpg`
    : "https://placehold.co/300x450?text=No+Cover";

  const description =
    typeof book.description === "string"
      ? book.description
      : book.description?.value || "No description available.";

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">{book.title}</CardTitle>
          <div className="flex flex-wrap gap-2 mt-2">
            {book.subjects?.slice(0, 5).map((subject) => (
              <Badge key={subject} variant="outline">
                {subject}
              </Badge>
            ))}
          </div>
        </CardHeader>

        <CardContent>
          <div className="flex flex-col md:flex-row gap-6">
            <img
              src={coverImage}
              alt={book.title}
              className="w-48 h-auto rounded-md object-cover shadow-md"
            />
            <div className="flex-1 space-y-4">
              <p className="text-gray-700">
                <strong>First Published:</strong>{" "}
                {book.first_publish_date || "Unknown"}
              </p>
              <p className="text-gray-700">
                <strong>Created:</strong>{" "}
                {book.created?.value
                  ? new Date(book.created.value).toLocaleDateString()
                  : "Unknown"}
              </p>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="font-semibold mb-2">Description</h3>
            <ScrollArea className="h-64 rounded-md border p-4">
              <p>{description}</p>
            </ScrollArea>
          </div>
        </CardContent>

        <CardFooter className="flex justify-between">
          <Button asChild variant="outline">
            <Link to="/">Back to Search</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
