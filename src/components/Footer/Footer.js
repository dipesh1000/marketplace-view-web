import React from "react";
import "./Footer.scss";
import Copyright from "./Copyright/Copyright";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Footer() {
  const category = useSelector((state) => state.category);
  return (
    <>
      <section id="footer">
        <div className="container">
          <div className="footer__links">
            <div className="links__box guide__links">
              <h3 className="links__header">Categories</h3>
              <ul>
                {category.data.length > 0 &&
                  category.data.map((cat, index) => (
                    <li key={cat?.id}>
                      <Link to={`/categories/${cat.slug}`}>{cat.title}</Link>
                    </li>
                  ))}
              </ul>
            </div>
            <div className="links__box guide__links">
              <h3 className="links__header">About</h3>
              <ul>
                <li>
                  <a href="#!">Careers</a>
                </li>
                <li>
                  <a href="#!">Partnerships</a>
                </li>
                <li>
                  <Link to="/privacy-policy">Privacy Policy</Link>
                </li>
                <li>
                  <Link to="/terms&services">Terms & Services</Link>
                </li>
                <li>
                  <Link to="/intellectual-proclaim">Intellectual Proclaim</Link>
                </li>
                <li>
                  <a href="#!">Business</a>
                </li>
                <li>
                  <a href="#!">Sitemap</a>
                </li>
              </ul>
            </div>
            <div className="links__box guide__links">
              <h3 className="links__header">Support</h3>
              <ul>
                <li>
                  <Link to="/support_tickets/new">Help & Support</Link>
                </li>
                <li>
                  <a href="#!">Trust & Safety</a>
                </li>
                <li>
                  <Link to="/support">FAQ & Guides</Link>
                </li>
              </ul>
            </div>
            <div className="links__box guide__links">
              <h3 className="links__header">Community</h3>
              <ul>
                <li>
                  <a href="#!">Events</a>
                </li>
                <li>
                  <a href="#!">Blogs</a>
                </li>
                <li>
                  <a href="#!">Invite a Friend</a>
                </li>
                <li>
                  <a href="#!">Become a Seller</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Copyright />
    </>
  );
}

export default Footer;
