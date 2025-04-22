"use server";

import { unstable_cache } from "next/cache";
import { Collections, Bookmarks } from "./types";

const RAINDROP_API_URL = "https://api.raindrop.io/rest/v1";
const CACHE_DURATION = 60 * 60 * 1.5;

async function getRequestOptions() {
  return {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.RAINDROP_ACCESS_TOKEN}`,
    },
    next: {
      revalidate: CACHE_DURATION,
    },
  };
}

export const getCollections = unstable_cache(
  async (): Promise<Collections> => {
    try {
      const options = await getRequestOptions();
      const response = await fetch(`${RAINDROP_API_URL}/collections`, options);

      if (!response.ok) {
        throw new Error(`Failed to fetch collections: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching collections:", error);
      return { items: [], count: 0, result: false };
    }
  },
  ["raindrop-collections"],
  { revalidate: CACHE_DURATION }
);

export const getBookmarks = unstable_cache(
  async (collectionId: number, page = 0): Promise<Bookmarks> => {
    try {
      const options = await getRequestOptions();
      const params = new URLSearchParams({
        page: page.toString(),
        perpage: "30",
      });

      const url = `${RAINDROP_API_URL}/raindrops/${collectionId}?${params}`;
      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(`Failed to fetch bookmarks: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(
        `Error fetching bookmarks for collection ${collectionId}:`,
        error
      );
      return { items: [], count: 0, result: false };
    }
  },
  ["raindrop-bookmarks"],
  { revalidate: CACHE_DURATION }
);

export async function getAllBookmarks(page = 0): Promise<Bookmarks> {
  return getBookmarks(0, page);
}
