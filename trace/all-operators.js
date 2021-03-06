// This demonstrates how to trace *all* parse tree nodes.
// It is usually more information than you need to find a problem.
(function() {
  var setup = require("./setup.js");
  var trace = new (require("apg-lib").trace)();
  var number;
  trace.filter.operators["<ALL>"] = true;
  number = ';ornament number\n';
  number += '\u2768555\u2769888\u20129999\n';
  setup(trace, number, "all-operators");
})();
