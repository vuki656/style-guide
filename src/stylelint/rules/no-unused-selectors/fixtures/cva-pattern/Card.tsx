import styles from "./Card.module.css"
import { cardVariants } from "./Card.variants"

export function Card({ size }) {
    return <div className={cardVariants({ size })}>{styles.header}</div>
}
