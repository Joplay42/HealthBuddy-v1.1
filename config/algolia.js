import { algoliasearch } from "algoliasearch";

// Initialize the algolia credentials and from the env
const ALGOLIA_APP_ID = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID;
const ALGOLIA_SEARCH_KEY = process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY;

export const client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_SEARCH_KEY);
