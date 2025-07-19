import "server-only";
import { cache } from "react";

const options = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_RAINDROP_ACCESS_TOKEN}`,
  },
};

const RAINDROP_API_URL = "https://api.raindrop.io/rest/v1";
export const getCollections = cache(async () => {
  try {
    const response = await fetch(`${RAINDROP_API_URL}/collections`, options);
    const collections = await response.json();
    return collections;
  } catch (error) {
    console.info(error);
    return null;
  }
});
