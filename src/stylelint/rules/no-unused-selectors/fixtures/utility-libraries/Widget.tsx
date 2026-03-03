import clsx from "clsx"

export function Widget({ active }) {
    return <div className={clsx("foo", "bar", { baz: active })}>Hello</div>
}
