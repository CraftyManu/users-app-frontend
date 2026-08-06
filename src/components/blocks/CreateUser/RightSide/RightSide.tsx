import styles from "./RightSide.module.css";
import fontStyles from "@/styles/fontStyles.module.css";
import Logo from "@/components/ui/Logo/Logo";

function LoginRightSide() {
  return (
    <div className={styles.rightBackground}>
      <Logo />

      <>
        <div className={styles.emptySpace}></div>
        <div className={`${styles.textContainer} ${styles.toBottom} ${styles.toLeft} ${styles.maxWidth}`}>
          <p className={`${fontStyles.inter} ${fontStyles.fw400}`}>Segura. Rápida. Escalable.</p>
        </div>

        <div className={`${styles.textContainer} ${styles.toBottom} ${styles.toLeft}`}>
          <p className={`${fontStyles.inter} ${fontStyles.fw600}`}>Gestiona usuarios sin complicaciones.</p>
        </div>
      </>
    </div>
  );
}

export default LoginRightSide;
