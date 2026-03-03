import styles from "./Layout.module.css"

export function Layout() {
    return (
        <div className={styles.parent}>
            <div className={styles.child}>Content</div>
        </div>
    )
}
