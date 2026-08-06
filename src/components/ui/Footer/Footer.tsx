import styles from "./Footer.module.css";

interface FooterProps {
  children: React.ReactNode;
}

function Footer({ children }: FooterProps) {
  return <p className={styles.footer}>{children}</p>;
}

export default Footer;
