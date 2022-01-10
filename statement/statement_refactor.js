const createStatementData = require("./createStatementData");

module.exports = function statement(invoice, plays) {
  return renderPlainText(createStatementData(invoice, plays));
};

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

  function formatAsUSD(number) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(number / 100);
  }
}
