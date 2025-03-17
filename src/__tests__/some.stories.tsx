import type { StoryObj } from "@storybook/react"
import React, { type ReactElement } from "react"

const Button = ({ children, name }: { readonly children: ReactElement; readonly name: string }) => {
    return (
        <button
            name={name}
            type="button"
        >
            {children}
        </button>
    )
}

const meta = {
    component: Button,
    name: "Button",
}

type StoryType = StoryObj<typeof meta>

export const Default: StoryType = {
    args: {
        children: "Click me!",
    },
}

export default meta
