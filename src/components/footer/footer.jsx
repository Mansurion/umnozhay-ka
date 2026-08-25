import { CURRENT_YEAR, PROJECT_NAME } from '../../constants/constants';
import styles from './footer.module.css';

export const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <p className={styles.text}>
                    &copy; {CURRENT_YEAR} {PROJECT_NAME}. Все права защищены.
                </p>
            </div>
        </footer>
    );
};
