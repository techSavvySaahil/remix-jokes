import React from "react";
import {
  Link,
  useRouteError,
  useParams
} from "@remix-run/react";

export default function JokesIndexRoute() {
  const { jokeId } = useParams();
  if (!jokeId) throw new Response("No jokes", { status: 404 });
  return null;
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (error.status === 404) {
    return (
      <div className="error-container">
        <p>
          There are no jokes to display. Click on a joke from the list on the left side.<br />
          You can change filters to see more jokes if there are none in the list.<br />
          Also, you can add a joke and make people laugh.
          <br />
        </p>
        <Link to="new">Add your own</Link>
      </div>
    );
  }

  return <div className="error-container">I did a whoopsies.</div>;
}
