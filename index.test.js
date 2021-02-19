const separateEntry = require(".");
const path = require("path");

describe("separateEntry", () => {
  it("separates entry into an entry object", () => {
    const result = separateEntry("./test", /\.(tsx?|jsx?)$/, /\.d\.ts$/);
    expect(Object.keys(result).length).toBe(4);
    expect(result["a"]).toBe(path.resolve(__dirname, "test", "a.tsx"));
    expect(result["B"]).toBe(path.resolve(__dirname, "test", "B.ts"));
    expect(result["x"]).toBe(path.resolve(__dirname, "test", "x.js"));
    expect(result["sub/c"]).toBe(
      path.resolve(__dirname, "test", "sub", "c.tsx")
    );
  });
});
