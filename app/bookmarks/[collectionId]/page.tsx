import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getBookmarks, getCollections } from "@/lib/raindrop";
import { BookmarkGrid } from "@/components/bookmarks/bookmark-grid";
import { Metadata } from "next";

interface BookmarkCollectionPageProps {
  params: Promise<{
    collectionId: string;
  }>;
}

export async function generateMetadata({
  params,
}: BookmarkCollectionPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const collectionId = parseInt(resolvedParams.collectionId);

  if (collectionId === 0) {
    return {
      title: "All Bookmarks - Bookmark Nexus",
      description: "View all your bookmarks in one place",
    };
  }

  try {
    const collectionsData = await getCollections();
    const collection = collectionsData.items.find(
      (c) => c._id === collectionId
    );

    if (!collection) {
      return {
        title: "Collection Not Found - Bookmark Nexus",
      };
    }

    return {
      title: `${collection.title} - Bookmark Nexus`,
      description: `Browse bookmarks in the ${collection.title} collection`,
    };
  } catch {
    return {
      title: "Bookmarks - Bookmark Nexus",
    };
  }
}

export default async function BookmarkCollectionPage({
  params,
}: BookmarkCollectionPageProps) {
  const resolvedParams = await params;
  const collectionId = parseInt(resolvedParams.collectionId);

  if (isNaN(collectionId)) {
    notFound();
  }

  const [collectionsData, bookmarksData] = await Promise.all([
    getCollections(),
    getBookmarks(collectionId),
  ]);

  const isRootCollection = collectionId === 0;

  if (!isRootCollection) {
    const collection = collectionsData.items.find(
      (c) => c._id === collectionId
    );
    if (!collection) {
      notFound();
    }
  }

  const title = isRootCollection
    ? "All Bookmarks"
    : collectionsData.items.find((c) => c._id === collectionId)?.title ||
      "Collection";

  const bookmarks = bookmarksData.items;
  const bookmarkCount = bookmarksData.count;

  return (
    <div className="container mx-auto px-4 py-10 space-y-8">
      <Button variant="ghost" asChild className="mb-4">
        <Link href="/">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
      </Button>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        <p className="text-muted-foreground">
          {bookmarkCount} bookmark{bookmarkCount !== 1 ? "s" : ""}
        </p>
      </div>

      {bookmarks.length > 0 ? (
        <BookmarkGrid bookmarks={bookmarks} />
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <p className="text-lg text-muted-foreground">
            No bookmarks found in this collection.
          </p>
          <Button asChild className="mt-4">
            <Link href="/">Go back home</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
