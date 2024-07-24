const value = "test" as string

if (value !== "test2") {
    ;`${value} yes` as any
}
