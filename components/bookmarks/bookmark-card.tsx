import Link from "next/link";
import { ExternalLink } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bookmark } from "@/lib/types";

interface BookmarkCardProps {
  bookmark: Bookmark;
}

export function BookmarkCard({ bookmark }: BookmarkCardProps) {
  return (
    <Card className="overflow-hidden flex flex-col h-full">
      <div className="relative aspect-video w-full overflow-hidden">
        {bookmark.cover ? (
          <div className="relative h-48 w-full">
            <img
              src={bookmark.cover}
              alt={bookmark.title}
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        ) : (
          <div className="flex h-48 w-full items-center justify-center bg-muted">
            <span className="text-muted-foreground">No cover image</span>
          </div>
        )}
      </div>

      <CardHeader className="p-4">
        <CardTitle className="line-clamp-2 text-lg">{bookmark.title}</CardTitle>
      </CardHeader>

      <CardContent className="p-4 pt-0 flex-grow">
        {bookmark.excerpt && (
          <p className="text-sm text-muted-foreground line-clamp-3">
            {bookmark.excerpt}
          </p>
        )}
      </CardContent>

      <CardFooter className="p-4 pt-0 flex flex-col items-start gap-2">
        <p className="text-xs text-muted-foreground">{bookmark.domain}</p>
        <Button asChild className="w-full">
          <Link href={bookmark.link} target="_blank" rel="noopener noreferrer">
            Visit <ExternalLink className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
