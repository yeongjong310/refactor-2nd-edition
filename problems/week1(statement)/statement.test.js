const statement = require("./statement");
const invoices = require("../../statement/invoices");
const plays = require("../../statement/plays");

describe("statement test", () => {
  test("statement(invoices[0], plays)", () => {
    let expected =
      "Statement for BigCo\n" +
      " Hamlet: $650.00 (55석)\n" +
      " As You Like It: $475.00 (35석)\n" +
      " Othello: $500.00 (40석)\n" +
      "총액: $1,625.00\n" +
      "적립 포인트: 47점\n";
    expect(statement(invoices[0], plays)).toBe(expected);
  });
});
