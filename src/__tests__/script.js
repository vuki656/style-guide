const value = Date.now() - 30
let some = Date.now()

if (value === some) {
    some = "test"
}

// eslint-disable-next-line no-console -- This is a test
console.log(some)
