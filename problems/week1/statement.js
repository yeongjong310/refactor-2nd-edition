// 1. 프로그래밍의 구조를 쉽게 파악할 수 있도록 변경하라.
// 2. 기능을 추가하기 쉬운 구조로 변경하라.

module.exports = function statement(invoice, plays) {
  let totalAmount = 0;
  let volumeCredits = 0;
  let statement = `Statement for ${invoice.customer}\n`;

  const format = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format;

  for (let perf of invoice.performances) {
    const play = plays[perf.playID];
    let thisAmount = 0;

    switch (play.type) {
      case "tragedy":
        thisAmount = 40000;
        if (perf.audience > 30) {
          thisAmount += 1000 * (perf.audience - 30);
        }
        break;
      case "comedy":
        thisAmount = 30000;
        if (perf.audience > 20) {
          thisAmount += 10000 + 500 * (perf.audience - 20);
        }
        break;
      default:
        throw new Error(`알 수 없는 장르: ${play.type}`);
    }

    // add volume credits
    volumeCredits += Math.max(perf.audience - 30, 0);

    // add extra credit for every ten comedy attendees
    if ("comedy" === play.type) volumeCredits += Math.floor(perf.audience / 5);

    statement += ` ${play.name}: ${format(thisAmount / 100)} (${
      perf.audience
    }석)\n`;
    totalAmount += thisAmount;
  }

  statement += `총액: ${format(totalAmount / 100)}\n`;
  statement += `적립 포인트: ${volumeCredits}점\n`;
  return statement;
};
