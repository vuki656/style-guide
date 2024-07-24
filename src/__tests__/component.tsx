import React from "react"

export const Test = () => {
    const foo = {
        bar: 1,
    }

    return (
        <>
            <div>{foo ? foo.bar : null}</div>
            <div />
        </>
    )
}

export const TestNew = () => {
    return <div />
}
