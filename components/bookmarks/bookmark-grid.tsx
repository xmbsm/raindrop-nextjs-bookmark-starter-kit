import { Bookmark } from "@/lib/types";
import { BookmarkCard } from "./bookmark-card";

interface BookmarkGridProps {
  bookmarks: Bookmark[];
}

export function BookmarkGrid({ bookmarks }: BookmarkGridProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {bookmarks.map((bookmark) => (
        <BookmarkCard key={bookmark._id} bookmark={bookmark} />
      ))}
    </div>
  );
}
