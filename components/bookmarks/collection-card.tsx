import Link from "next/link";
import { FolderIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Collection } from "@/lib/types";

interface CollectionCardProps {
  collection: Collection;
}

export function CollectionCard({ collection }: CollectionCardProps) {
  return (
    <Link href={`/bookmarks/${collection._id}`}>
      <Card className="overflow-hidden hover:border-primary transition-colors">
        <CardHeader className="p-4">
          <CardTitle className="flex items-center gap-2">
            <FolderIcon className="h-5 w-5" />
            <span className="line-clamp-1">{collection.title}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <p className="text-sm text-muted-foreground">
            {collection.count} bookmarks
          </p>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <p className="text-xs text-muted-foreground">
            Last updated: {new Date(collection.lastUpdate).toLocaleDateString()}
          </p>
        </CardFooter>
      </Card>
    </Link>
  );
}
