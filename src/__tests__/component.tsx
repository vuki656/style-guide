import React from "react"

export const Test = () => {
    const foo = {
        bar: 1,
    }

    return (
        <>
            <div>{foo.bar === 3 ? foo.bar : null}</div>
            <div />
        </>
    )
}
