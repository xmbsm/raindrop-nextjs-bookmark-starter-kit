import Link from "next/link";
import { BookmarkIcon } from "lucide-react";
import { ModeToggle } from "./theme-toggle";

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex p-4 items-center space-x-4 sm:justify-between sm:space-x-0 mx-auto">
        <div className="flex gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <BookmarkIcon className="h-6 w-6" />
            <span className="inline-block font-bold">Bookmark Nexus</span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            <ModeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}
