import styles from "./CreateUser.module.css";
import RightSide from "@/components/blocks/CreateUser/RightSide/RightSide";
import CreateForm from "@/components/blocks/CreateUser/CreateForm/CreateForm";

function CreateUser() {
  return (
    <main className={`${styles.container} ${styles.main}`}>
      <section className={styles.left}>
        <CreateForm />
      </section>

      <section className={styles.right}>
        <RightSide />
      </section>
    </main>
  );
}

export default CreateUser;
