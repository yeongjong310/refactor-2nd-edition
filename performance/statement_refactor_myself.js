function resultManager() {
  let _result = "";

  return {
    addResultLine(str) {
      _result += str + "\n";
    },
    get result() {
      return _result;
    },
  };
}

// aPerformance = { playID: 연극 ID, audience: 관람객 수 }
// play = { ${playID} : { name: 연극이름, type: 장르 }}
// return totalAmount
function amountFor(aPerformance, play) {
  let thisAmount = 0;

  switch (type) {
    case "tragedy":
      thisAmount += 40000;
      if (aPerformance.audience > 30) {
        thisAmount += 1000 * (aPerformance.audience - 30);
      }
      break;
    case "comedy":
      thisAmount += 30000;
      if (aPerformance.audience > 20) {
        thisAmount += 10000 + 500 * (aPerformance.audience - 20);
      }
      break;
    default:
      throw new Error(`알 수 없는 장르: ${play.type}`);
  }

  return thisAmount;
}

module.exports = function statement(invoice, plays) {
  let totalAmount = 0;
  let volumeCredits = 0;
  let _resultManager = resultManager();
  _resultManager.addResultLine(`Statement for ${invoice.customer}`);

  const format = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format;

  for (let perf of invoice.performances) {
    const play = plays[perf.playID];
    let thisAmount = amountFor(perf, play);

    // add volume credits
    volumeCredits += Math.max(perf.audience - 30, 0);

    // add extra credit for every ten comedy attendees
    if ("comedy" === play.type) volumeCredits += Math.floor(perf.audience / 5);

    _resultManager.addResultLine(
      ` ${play.name}: ${format(thisAmount / 100)} (${perf.audience}석)`
    );
    totalAmount += thisAmount;
  }

  _resultManager.addResultLine(`총액: ${format(totalAmount / 100)}`);
  _resultManager.addResultLine(`적립 포인트: ${volumeCredits}점`);

  return _resultManager.result;
};
