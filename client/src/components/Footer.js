import React from 'react';

function Footer() {
  const links = ['Audio Description', 'Help Center', 'Gift Cards', 'Media Center', 'Investor Relations', 'Jobs', 'Terms of Use', 'Privacy', 'Legal Notices', 'Cookie Preferences', 'Corporate Information', 'Contact Us'];
  const columns = links.slice(0, 8);
  const columns2 = links.slice(8);

  return (
    <footer className="footer">
      <div className="footer-grid">
        {columns.map((link, i) => (
          <span key={i} className="footer-link">{link}</span>
        ))}
      </div>
      <div className="footer-grid" style={{ marginTop: 16 }}>
        {columns2.map((link, i) => (
          <span key={i} className="footer-link">{link}</span>
        ))}
      </div>
    </footer>
  );
}

export default Footer;