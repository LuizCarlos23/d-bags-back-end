"use strict";

function soma() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    a: 2,
    b: 5
  },
      a = _ref.a,
      b = _ref.b;

  console.log(a, b);
  console.log(a + b);
}

soma();
soma({
  b: 10
});
soma();
soma();