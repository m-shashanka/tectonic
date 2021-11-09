import styles from './modal.module.css';

export default function Modal({children,closeModal}){
    return (
        <div className={styles.backdrop} onClick={closeModal}>
            <div className={styles.modal}>
                {children}
            </div>
        </div>
    );
}
