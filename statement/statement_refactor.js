const createStatementData = require("./createStatementData");

function statement(invoice, plays) {
  return renderPlainText(createStatementData(invoice, plays));
}

function renderPlainText(data) {
  let result = `Statement for ${data.customer}\n`;

  for (let perf of data.performances) {
    result += ` ${perf.play.name}: ${formatAsUSD(perf.amount)} (${
      perf.audience
    }석)\n`;
  }

  result += `총액: ${formatAsUSD(data.totalAmount)}\n`;
  result += `적립 포인트: ${data.totalVolumeCredits}점\n`;

  return result;
}

function htmlStatment(invoice, plays) {
  return renderHTML(createStatementData(invoice, plays));
}

function renderHTML(data) {
  let result = `<h1>청구 내역 (고객명: ${data.customer})</h1>\n`;
  result += "<table>\n";
  result += "<tr><th>연극</th><th>좌석 수</th><th>금액</th></tr>\n";
  for (let perf of data.performances) {
    result += ` <tr><td>${perf.play.name}</td><td>${perf.audience}석</td>`;
    result += `<td>${formatAsUSD(perf.amount)}</td></tr>\n`;
  }
  result += "</table>\n";
  result += `<p>총액: ${formatAsUSD(data.totalAmount)}</p>\n`;
  result += `<p>적립 포인트: ${data.totalVolumeCredits}점</p>\n`;
  return result;
}

function formatAsUSD(number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(number / 100);
}

module.exports = {
  statement,
  htmlStatment,
};
