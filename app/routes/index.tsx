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
  const date = new Date().toISOString();
  return json(
    {
      date,
      stuff: "stuff",
    },
    {
      headers: {
        "Cache-Control": "public, max-age=60",
      },
    }
  );
};

export default function Index() {
  let { date, stuff } = useLoaderData();
  return (
    <>
      <p>Date: {date}</p>
      <p>Stuff: {stuff}</p>
    </>
  );
}
