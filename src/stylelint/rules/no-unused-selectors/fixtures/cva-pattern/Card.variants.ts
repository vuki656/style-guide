import { cva } from "class-variance-authority"

import styles from "./Card.module.css"

export const cardVariants = cva(styles.cardBase, {
    variants: {
        size: {
            large: styles.cardLarge,
            small: styles.cardSmall,
        },
    },
})
