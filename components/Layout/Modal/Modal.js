import { useEffect } from "react";
import styles from "./modal.module.css";

export default function Modal({ children, closeModal }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "unset");
  }, []);

  return (
    <>
      <div className={styles.backdrop} onClick={closeModal}></div>
      <div className={styles.modal}>{children}</div>
    </>
  );
}
