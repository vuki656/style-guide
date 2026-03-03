import styles from "./Button.module.css"
import { buttonVariants } from "./Button.variants"

export function Button({ variant }) {
    return <button className={buttonVariants({ variant })}>{styles.base}</button>
}
