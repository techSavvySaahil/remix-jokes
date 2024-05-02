import { Link } from "@remix-run/react";

const Footer = () => {
  return (
    <footer className="jokes-footer">
      <div className="container">
        <Link reloadDocument to="/jokes.rss">
          RSS
        </Link>
      </div>
    </footer>
  );
}

export default Footer;