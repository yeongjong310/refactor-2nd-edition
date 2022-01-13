const { statement, htmlStatment } = require("./statement_refactor");
const invoices = require("./invoices");
const plays = require("./plays");

describe("statement test", () => {
  test("statement(invoices[0], plays)", () => {
    let expected =
      "Statement for BigCo\n" +
      " Hamlet: $650.00 (55석)\n" +
      " As You Like It: $580.00 (35석)\n" +
      " Othello: $500.00 (40석)\n" +
      "총액: $1,730.00\n" +
      "적립 포인트: 47점\n";
    expect(statement(invoices[0], plays)).toBe(expected);
  });
  test("htmlStatment(invoices[0], plays)", () => {
    let expected =
      "<h1>청구 내역 (고객명: BigCo)</h1>\n" +
      "<table>\n" +
      "<tr><th>연극</th><th>좌석 수</th><th>금액</th></tr>\n" +
      " <tr><td>Hamlet</td><td>55석</td><td>$650.00</td></tr>\n" +
      " <tr><td>As You Like It</td><td>35석</td><td>$580.00</td></tr>\n" +
      " <tr><td>Othello</td><td>40석</td><td>$500.00</td></tr>\n" +
      "</table>\n" +
      "<p>총액: $1,730.00</p>\n" +
      "<p>적립 포인트: 47점</p>\n";
    expect(htmlStatment(invoices[0], plays, true)).toBe(expected);
  });
});
