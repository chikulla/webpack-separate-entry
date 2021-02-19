const { fstat } = require("fs");
const path = require("path");
const fs = require("fs");

function readDirRecursive(root, pattern, ignore) {
  const r = [];
  const children = fs.readdirSync(root);
  children.forEach((c) => {
    targetPath = root + "/" + c;
    const dir = fs.lstatSync(targetPath).isDirectory();
    if (dir) {
      r.push(...readDirRecursive(targetPath, pattern, ignore));
    } else if (!!targetPath.match(pattern) && !targetPath.match(ignore)) {
      r.push(targetPath);
    }
  });
  return r;
}

/**
 * generates a webpack's entry point object.
 * @param {string} target the root path of src
 * @param {RegExp} pattern patterns to match
 * @param {RegExp} ignore patterns to ignore
 */
function separateEntry(target, pattern, ignore) {
  const root = path.resolve(__dirname, target);
  const paths = readDirRecursive(root, pattern, ignore);
  const result = paths.reduce(function (acc, cur) {
    key = cur.replace(root + "/", "").replace(pattern, "");
    return { ...acc, [key]: cur };
  }, {});
  return result;
}

module.exports = separateEntry;
