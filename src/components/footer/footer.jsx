import { CURRENT_YEAR, PROJECT_NAME } from '../../constants/constants';
import styles from './footer.module.css';

export const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.content}>
                <span className={styles.copyright}>
                    © {CURRENT_YEAR} {PROJECT_NAME}
                </span>
                <span className={styles.separator}>|</span>
                <span className={styles.author}>
                    Made by{' '}
                    <a
                        href="https://github.com/Mansurion"
                        className={styles.link}
                        target="_blank"
                        rel="noreferrer"
                    >
                        Mansurion
                    </a>
                </span>
            </div>
        </footer>
    );
};
