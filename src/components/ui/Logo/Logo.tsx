import styles from "./Logo.module.css";
import fontStyles from "@/styles/fontStyles.module.css";

function Logo() {
  return (
    <div className={styles.logoWrapper}>
      <div className={styles.logoIcon}>U</div>

      <p className={`${styles.logoText} ${fontStyles.grotesk} ${fontStyles.fw700}`}>UsersApp</p>
    </div>
  );
}

export default Logo;
