import React from "react";
import {Nav} from "react-bootstrap";
import "./PrimaryCat.css";
import {Link} from "react-router-dom";

function PrimaryCatSingle({cat}) {
	return (
		<>
			<Nav.Item>
				<div className='singleCatItems has_two_column'>
					<Link to={`/categories/${cat.slug}`}> {cat.title}</Link>
					<ul className={`custom-dropdown-menu `}>
						{cat.child &&
							cat.child.map(childCat => (
								<li key={childCat.id} className='singleChildCatss'>
									<Link to={`/categories/${cat.slug}/${childCat.slug}`}>
										{childCat.title}
									</Link>
								</li>
							))}
					</ul>
				</div>

				{/* <NavDropdown
          title={cat.title}
          show={show}
          onMouseEnter={showDropdown}
          onMouseLeave={hideDropdown}
          key={cat.id}
          eventKey={cat.slug}
          //   onClick={() => handleClick(cat.slug)}
          id="nav-dropdown"
          className="singleCatItems has_two_column"
          style={{
            zIndex: 1111,
            padding: 0,
          }}
        >
          {cat.child &&
            cat.child.map((childCat, index) => (
              <>
                <NavDropdown.Item
                  key={index}
                  //   href={`/categories/${cat.slug}/${childCat.slug}`}
                  // href={""}
                  //   onClick={(e)=>handleRedirect(e, cat.slug,childCat?.slug)}
                  //   href={`/categories/${cat.slug}/${childCat.slug}`}
                  eventKey={`${cat.slug}/${childCat.slug}`}
                  className={styles.dropdownItem}
                >
                  {childCat.title}
                </NavDropdown.Item>
              </>
            ))}
        </NavDropdown>
        */}
			</Nav.Item>
		</>
	);
}

export default PrimaryCatSingle;
