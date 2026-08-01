import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <span className="mono footer-text">
          © {new Date().getFullYear()} Matodzi Nenwali
        </span>
        <div className="footer-links">
          <a
            className="mono"
            href="https://www.linkedin.com/in/matodzinenwali"
            target="_blank"
            rel="noreferrer"
          >
            --linkedin
          </a>
          <a
            className="mono"
            href="https://github.com/matodzinenwali"
            target="_blank"
            rel="noreferrer"
          >
            --github
          </a>
          <a className="mono" href="mailto:matodzinenwali4@gmail.com">
            --email
          </a>
        </div>
      </div>
    </footer>
  );
}
