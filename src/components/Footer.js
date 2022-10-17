import React from "react";

function Footer({ nextUrl, prevUrl, getprevPage, getNextPage }) {
  const prevPage = () => {
    if (prevUrl) {
      return (
        <button className="btn btn-outline-dark btn-sm" onClick={getprevPage}>
          prev
        </button>
      );
    } else {
      return;
    }
  };

  const nextPage = () => {
    if (nextUrl) {
      return (
        <button
          className="btn btn-outline-dark btn-sm float-right"
          onClick={getNextPage}
        >
          next
        </button>
      );
    } else {
      return;
    }
  };

  const prevPageButton = prevPage();
  const nextPageButton = nextPage();

  return (
    <div>
          <div className="row">
              <footer className="fixed-bottom">
                  {prevPageButton}
                  {nextPageButton}
              </footer>
      </div>
    </div>
  );
}

export default Footer;
