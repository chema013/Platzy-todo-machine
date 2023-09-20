import { createClient } from "contentful";

const CONTENT_TYPES = { MOVIE: "movie" };

const getClient = () => {
  let params = {
    space: "raw3ki53c8pp",
    environment: "master",
    accessToken: "t1stngmng-6SPuxDhSZQQt6z4uZY-FAXXhGK5SZgXy0",
    host: "cdn.contentful.com",
  };

  const client = createClient(params);
  return client;
};

const getPreviewClient = () => {
  let params = {
    space: "raw3ki53c8pp",
    environment: "master",
    accessToken: "W0mkfxkwdydJQ_AICdq9qe2-isgLvKJCiKItsAVkKQM",
    host: "preview.contentful.com",
  };

  const client = createClient(params);
  return client;
};

export const getMovies = async (params) => {
  let query;
  if (!params) {
    query = {
      content_type: CONTENT_TYPES["MOVIE"],
    };
  } else {
    query = params;
  }
  const client = getClient();
  const { items } = await client.getEntries(query);
  return items;
};

export const getPreviewMovies = async () => {
  const query = {
    content_type: CONTENT_TYPES["MOVIE"],
  };
  const client = getPreviewClient();
  const { items } = await client.getEntries(query);
  return items;
};
