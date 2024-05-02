import { Form, Link } from "@remix-run/react";
import type { User } from "@prisma/client";

type HeaderType = {
  userData: User
}

const Header = ({ userData }: HeaderType) => {
  return (
    <header className="jokes-header">
      <div className="container">
        <h1 className="home-link">
          <Link to="/" title="Remix Jokes" aria-label="Remix Jokes">
            <span className="logo">🤪</span>
            <span className="logo-medium">J🤪KES</span>
          </Link>
        </h1>
        {userData ? (
          <div className="user-info">
            <span>{`Hi ${userData.username}`}</span>
            <Form action="/logout" method="post">
              <button type="submit" className="button">
                Logout
              </button>
            </Form>
          </div>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </header>
  );
}

export default Header;