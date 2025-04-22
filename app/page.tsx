import Link from "next/link";
import { BookmarkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getAllBookmarks, getCollections } from "@/lib/raindrop";
import { BookmarkGrid } from "@/components/bookmarks/bookmark-grid";
import { CollectionGrid } from "@/components/bookmarks/collection-grid";

export default async function HomePage() {
  const [collectionsData, bookmarksData] = await Promise.all([
    getCollections(),
    getAllBookmarks(),
  ]);

  const collections = collectionsData.items.filter((c) => c._id !== 0);
  const recentBookmarks = bookmarksData.items.slice(0, 8);

  return (
    <div className="container py-10 mx-auto">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center py-12 text-center md:py-24">
        <BookmarkIcon className="h-16 w-16 text-primary" />
        <h1 className="mt-6 text-4xl font-bold md:text-6xl">Bookmark Nexus</h1>
        <p className="mt-4 max-w-[42rem] text-xl text-muted-foreground">
          Your bookmarks organized beautifully. Powered by Raindrop.io.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button asChild size="lg">
            <Link href="#collections">Browse Collections</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="#recent">Recent Bookmarks</Link>
          </Button>
        </div>
      </section>

      {/* Collections Section */}
      <section id="collections" className="py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold tracking-tight">Collections</h2>
          <p className="text-muted-foreground">
            {collections.length} collection{collections.length !== 1 ? "s" : ""}
          </p>
        </div>
        <CollectionGrid collections={collections} />
      </section>

      {/* Recent Bookmarks Section */}
      <section id="recent" className="py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold tracking-tight">
            Recent Bookmarks
          </h2>
          <Button asChild variant="ghost">
            <Link href="/bookmarks/0">View All</Link>
          </Button>
        </div>
        <BookmarkGrid bookmarks={recentBookmarks} />
      </section>
    </div>
  );
}
