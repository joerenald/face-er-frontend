import { Heart } from "lucide-react";

function Footer() {
  return (
    <footer className="footer">
      <p>
        Made with{" "}
        <Heart
          size={18}
          fill="#ef4444"
          color="#ef4444"
          className="footer-heart"
        />{" "}
        by <span>Joe Renald</span>
      </p>
    </footer>
  );
}

export default Footer;