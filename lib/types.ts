export interface Collection {
  _id: number;
  title: string;
  count: number;
  cover: string[];
  expanded: boolean;
  created: string;
  lastUpdate: string;
}

export interface Collections {
  items: Collection[];
  count: number;
  result: boolean;
}

export interface Bookmark {
  _id: number;
  title: string;
  excerpt: string;
  link: string;
  domain: string;
  cover: string;
  created: string;
  lastUpdate: string;
  tags: string[];
}

export interface Bookmarks {
  items: Bookmark[];
  count: number;
  result: boolean;
}
