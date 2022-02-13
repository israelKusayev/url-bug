import { test, expect, Page, request } from "@playwright/test";

test("wikipedia not working example", async ({ page }) => {
  await page.goto("https://en.wikipedia.org/wiki/AA");

  const wikipediaRequestContext = await getWikipediaRequestContext();

  const response = await wikipediaRequestContext.get(
    "action=opensearch&format=json&formatversion=2&search=aa&namespace=0&limit=10"
  );
  console.log("URL is url of page goto. this is not right!!", response.url());

  console.log(response.status());
});

const getWikipediaRequestContext = () => {
  return request.newContext({ baseURL: "https://en.wikipedia.org/w/api.php" });
};

test("wikipedia working example", async ({ page }) => {
  await page.goto("https://en.wikipedia.org/wiki/AA");

  const wikipediaRequestContext = await getWikipediaRequestContext2();

  const response = await wikipediaRequestContext.get(
    "https://en.wikipedia.org/w/api.php?action=opensearch&format=json&formatversion=2&search=aa&namespace=0&limit=10"
  );
  console.log(response.url());

  console.log(response.status());
});

const getWikipediaRequestContext2 = () => {
  return request.newContext();
};
