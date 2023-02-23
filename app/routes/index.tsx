import type { HeadersFunction, LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export const headers: HeadersFunction = ({ actionHeaders, loaderHeaders }) => {
  let headers = new Headers(actionHeaders);
  loaderHeaders.has("Cache-Control") &&
    headers.set("Cache-Control", loaderHeaders.get("Cache-Control")!);
  return headers;
};

export const loader: LoaderFunction = async ({ request }) => {
  // Random number from 1 to 100
  const randomNumber = Math.floor(Math.random() * 100) + 1;
  const todo = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${randomNumber}`
  );
  const date = new Date().toISOString();
  return json(
    {
      randomNumber,
      date,
      todo,
      stuff: "stuff",
    },
    {
      headers: {
        "Cache-Control": "s-maxage=60",
      },
    }
  );
};

export default function Index() {
  let data = useLoaderData();
  return (
    <>
      <p>Data: {JSON.stringify(data, null, 2)}</p>
    </>
  );
}
