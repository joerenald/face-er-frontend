import { motion } from "framer-motion";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
} from "react-icons/fa";

const Contact = () => {
  return (
    <section className="contact-section">

      <motion.div
        className="contact-card"
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <p>by</p>
        <h2>Joe Renald A</h2>

        <h4>
          MCA Student • AI & Full Stack Developer
        </h4>
        <div className="social-icons">

          <motion.a
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.95 }}
            href="https://github.com/joerenald"
            target="_blank"
            rel="noreferrer"
          >
            <FaGithub />
          </motion.a>

          <motion.a
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.95 }}
            href="https://www.linkedin.com/in/YOUR-LINKEDIN"
            target="_blank"
            rel="noreferrer"
          >
            <FaLinkedin />
          </motion.a>

          <motion.a
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.95 }}
            href="mailto:YOURMAIL@gmail.com"
          >
            <FaEnvelope />
          </motion.a>

        </div>

      </motion.div>

    </section>
  );
};

export default Contact;