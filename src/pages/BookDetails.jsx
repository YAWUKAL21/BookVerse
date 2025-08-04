import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
//import { getBookById } from "@/api/booksApi";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

export function BookDetails() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        //const data = await getBookById(id);
        //setBook(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto py-8">
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-1/2 mt-2" />
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4">
              <Skeleton className="h-64 w-48" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-6 w-1/2" />
                <Skeleton className="h-4 w-full mt-4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </div>
          </CardContent>
        </Card>
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

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>{book.volumeInfo?.title}</CardTitle>
          <CardDescription>
            {book.volumeInfo?.subtitle}
          </CardDescription>
          <div className="flex gap-2 mt-2">
            {book.volumeInfo?.categories?.map((category) => (
              <Badge key={category} variant="outline">
                {category}
              </Badge>
            ))}
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="flex flex-col md:flex-row gap-6">
            {book.volumeInfo?.imageLinks?.thumbnail && (
              <img
                src={book.volumeInfo.imageLinks.thumbnail.replace('http://', 'https://')}
                alt={book.volumeInfo.title}
                className="w-48 h-auto rounded-md object-cover shadow-md"
              />
            )}
            
            <div className="flex-1 space-y-4">
              <div>
                <h3 className="font-semibold">Authors</h3>
                <p>{book.volumeInfo?.authors?.join(', ') || 'Unknown author'}</p>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="font-semibold">Publisher</h3>
                <p>{book.volumeInfo?.publisher || 'Not specified'}</p>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="font-semibold">Published Date</h3>
                <p>{book.volumeInfo?.publishedDate || 'Unknown'}</p>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="font-semibold">Page Count</h3>
                <p>{book.volumeInfo?.pageCount || 'Not specified'} pages</p>
              </div>
            </div>
          </div>
          
          <Separator className="my-6" />
          
          <div>
            <h3 className="font-semibold mb-2">Description</h3>
            <ScrollArea className="h-64 rounded-md border p-4">
              <p
                dangerouslySetInnerHTML={{
                  __html: book.volumeInfo?.description || 'No description available.',
                }}
              />
            </ScrollArea>
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-between">
          <Button variant="outline">
            Back to Search
          </Button>
          {book.volumeInfo?.previewLink && (
            <Button asChild>
              <a
                href={book.volumeInfo.previewLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                Preview on Google Books
              </a>
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}