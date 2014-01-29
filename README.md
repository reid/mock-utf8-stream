# mock-utf8-stream

Mock readable and writable streams for stdin and stdout UTF-8 text. Only basic operations are mocked. Useful for testing command-line programs.

## Example

```
var assert = require("assert");
var stream = require("mock-utf8-stream");

var stdin = new stream.MockReadableStream();
var stdout = new stream.MockWritableStream();

function example(opts, cb) {
    opts.stdin.on("data", function (data) {
        if (data === "hello") {
            opts.stdout.write("hello\n");
        }
        cb(null);
    });
}

// Begin capturing data events.
// You can read captured data as a UTF-8
// string on the `stdout.capturedData` property.
stdout.captureData();

example({
    stdin: stdin,
    stdout: stdout
}, function (err) {
    if (err) { throw err; }
    assert.strictEqual(stdout.capturedData, "hello\n");
    console.log("OK");
});

stdin.write("hello");
```

## Author & License

BSD. See LICENSE for details and copyright information.
