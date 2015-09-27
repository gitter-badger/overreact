module.exports = function (message, noExit) {
  console.error("\n[!] " + message + "\n");
  !noExit && process.exit();
}
