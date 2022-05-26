module.exports = function statement(invoice, plays) {
  let _creditsManager = creditsManager();
  let _resultManager = resultManager();
  _resultManager.addResultLine(`Statement for ${invoice.customer}`);

  for (let perf of invoice.performances) {
    _creditsManager.saveCredits(perf);

    _resultManager.addResultLine(
      ` ${playFor(perf).name}: ${usd(amountFor(perf))} (${perf.audience}석)`
    );
  }

  _resultManager.addResultLine(`총액: ${usd(totalAmount())}`);
  _resultManager.addResultLine(`적립 포인트: ${_creditsManager.credits}점`);

  return _resultManager.result;

  function usd(krw) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(krw / 100);
  }

  function playFor(aPerformance) {
    return plays[aPerformance.playID];
  }

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
      saveCredits(aPerformance) {
        const play = playFor(aPerformance);

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

  function amountFor(aPerformance) {
    let thisAmount = 0;
    const play = playFor(aPerformance);

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

  function totalAmount() {
    let result = 0;
    for (let perf of invoice.performances) {
      result += amountFor(perf);
    }
    return result;
  }
};
