import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bookmark, BookmarkCheck } from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"
import { useState, useEffect } from "react"

const BookCard = ({ book }) => {
  const  {currentUser}  = useAuth();
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (currentUser) {
      const savedBooks = JSON.parse(localStorage.getItem('savedBooks') || '{}')
      setIsSaved(savedBooks[currentUser.uid]?.some(b => b.id === book.id) || false)
    }
  }, [currentUser, book.id])

  const handleSaveToggle = () => {
    if (!currentUser) {
      alert("User needs to login first")
      return
    }

    const savedBooks = JSON.parse(localStorage.getItem('savedBooks') || '{}')
    const userSavedBooks = savedBooks[currentUser.uid] || []

    let updatedBooks
    if (isSaved) {
      updatedBooks = userSavedBooks.filter(b => b.id !== book.id)
    } else {
      updatedBooks = [...userSavedBooks, book]
    }

    localStorage.setItem('savedBooks', 
      JSON.stringify({
        ...savedBooks,
        [currentUser.uid]: updatedBooks
      })
    )
    setIsSaved(!isSaved)
  }

  const {
    title = "Untitled Book",
    authors = ["Unknown Author"],
    description = "No description available.",
    imageLinks = { thumbnail: "https://placehold.co/300x450?text=No+Cover&font=roboto" },
    categories = ["General"],
    publishedDate,
    averageRating
  } = book.volumeInfo || {}

  return (
    <Card className="w-full max-w-xs hover:shadow-md transition-all duration-200 flex flex-col h-[500px]">
      <CardHeader className="p-3 pb-1 flex-none">
        <div className="relative h-40 w-full mx-auto flex items-center justify-center bg-gray-50 rounded-sm"> {/* Added flex centering and background */}
          <img
            src={imageLinks?.thumbnail || "https://placehold.co/300x450?text=No+Cover&font=roboto"}
            alt={`Cover of ${title}`}
            className="object-contain max-h-full max-w-full"
            style={{
              width: 'auto',
              height: 'auto',
              maxHeight: '100%',
              maxWidth: '100%',
            }}
            loading="lazy"
          />
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0 flex-grow">
        <CardTitle className="text-lg line-clamp-2 mb-1">{title}</CardTitle>
        <CardDescription className="line-clamp-1 mb-2">
          by {authors.join(", ")}
        </CardDescription>
        
        {categories?.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {categories.slice(0, 2).map((category) => (
              <Badge key={category} variant="outline" className="text-xs">
                {category}
              </Badge>
            ))}
          </div>
        )}

        {description && (
          <p className="text-sm text-muted-foreground line-clamp-3 mb-3">
            {description}
          </p>
        )}

        <div className="flex justify-between text-xs text-gray-500 mt-auto">
          {publishedDate && (
            <span>Published: {new Date(publishedDate).getFullYear()}</span>
          )}
          {averageRating && (
            <span className="flex items-center">
              ⭐ {averageRating}/5
            </span>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex-none">
        {currentUser ? (
          <Button 
            variant={isSaved ? "default" : "outline"} 
            className="w-full gap-2"
            onClick={handleSaveToggle}
          >
            {isSaved ? (
              <>
                <BookmarkCheck className="h-4 w-4" />
                Saved
              </>
            ) : (
              <>
                <Bookmark className="h-4 w-4" />
                Save Book
              </>
            )}
          </Button>
        ) : (
            "Login to Save"
        )}
      </CardFooter>
    </Card>
  )
}

export default BookCard