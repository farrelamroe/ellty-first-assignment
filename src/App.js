import React, { useState, useEffect } from "react";
import "./index.css";

const PageSelector = () => {
  // Data awal halaman
  const initialPages = [
    { id: "page1", label: "Page 1", isChecked: false },
    { id: "page2", label: "Page 2", isChecked: false },
    { id: "page3", label: "Page 3", isChecked: false },
    { id: "page4", label: "Page 4", isChecked: false },
  ];

  const [pages, setPages] = useState(initialPages);
  const [isAllChecked, setIsAllChecked] = useState(false);

  // Effect untuk memantau perubahan pada individual pages
  // Jika semua page tercentang, maka "All pages" ikut tercentang
  useEffect(() => {
    const allSelected = pages.every((page) => page.isChecked);
    setIsAllChecked(allSelected);
  }, [pages]);

  // Handle klik pada checkbox "All pages"
  const handleAllCheck = () => {
    const newStatus = !isAllChecked;
    setIsAllChecked(newStatus);
    const updatedPages = pages.map((page) => ({
      ...page,
      isChecked: newStatus,
    }));
    setPages(updatedPages);
  };

  // Handle klik pada checkbox individual
  const handlePageCheck = (id) => {
    const updatedPages = pages.map((page) =>
      page.id === id ? { ...page, isChecked: !page.isChecked } : page
    );
    setPages(updatedPages);
  };

  // Handle tombol Done
  const handleDone = () => {
    const selectedIds = pages
      .filter((p) => p.isChecked)
      .map((p) => p.label)
      .join(", ");
    
    if (selectedIds) {
      alert(`You selected: ${selectedIds}`);
    } else {
      alert("No pages selected");
    }
  };

  return (
    <div className="container">
      <div className="card">
        {/* Header Section: All Pages */}
        <div className="row item-row" onClick={handleAllCheck}>
          <label className="label">All pages</label>
          <input
            type="checkbox"
            className="custom-checkbox"
            checked={isAllChecked}
            onChange={handleAllCheck}
          />
        </div>

        <div className="divider"></div>

        {/* List Section: Individual Pages */}
        <div className="list-container">
          {pages.map((page) => (
            <div key={page.id} className="row item-row" onClick={() => handlePageCheck(page.id)}>
              <label className="label">{page.label}</label>
              <input
                type="checkbox"
                className="custom-checkbox"
                checked={page.isChecked}
                onChange={() => handlePageCheck(page.id)}
              />
            </div>
          ))}
        </div>

        <div className="divider"></div>

        {/* Footer Section: Button */}
        <div className="footer">
          <button className="btn-done" onClick={handleDone}>
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  return <PageSelector />;
}