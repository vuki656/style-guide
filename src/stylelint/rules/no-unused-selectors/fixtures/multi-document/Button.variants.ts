import { cva } from "class-variance-authority"

import styles from "./Button.module.css"

export const buttonVariants = cva(styles.variant, {
    variants: {
        size: {
            large: styles.large,
            small: styles.small,
        },
    },
})
