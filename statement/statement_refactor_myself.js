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

function creditsManager() {
  let _credits = 0;

  return {
    saveCredits(aPerformance, play) {
      _credits += Math.max(aPerformance.audience - 30, 0);
      if ("comedy" === play.type)
        _credits += Math.floor(aPerformance.audience / 5);
    },
    get credits() {
      return _credits;
    },
  };
}

// aPerformance = { playID: 연극 ID, audience: 관람객 수 }
// play = { ${playID} : { name: 연극이름, type: 장르 }}
// return totalAmount
function amountFor(aPerformance, play) {
  let thisAmount = 0;

  switch (play.type) {
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
      thisAmount += 300 * aPerformance.audience;
      break;
    default:
      throw new Error(`알 수 없는 장르: ${play.type}`);
  }

  return thisAmount;
}

module.exports = function statement(invoice, plays) {
  let totalAmount = 0;
  let _creditsManager = creditsManager();
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

    _creditsManager.saveCredits(perf, play);

    _resultManager.addResultLine(
      ` ${play.name}: ${format(thisAmount / 100)} (${perf.audience}석)`
    );
    totalAmount += thisAmount;
  }

  _resultManager.addResultLine(`총액: ${format(totalAmount / 100)}`);
  _resultManager.addResultLine(`적립 포인트: ${_creditsManager.credits}점`);

  return _resultManager.result;
};
