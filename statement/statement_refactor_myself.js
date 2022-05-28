module.exports = function statement(invoice, plays) {
  let _creditsManager = creditsManager();
  let _statementDataManager = statementDataManager(invoice.customer);

  for (let perf of invoice.performances) {
    _creditsManager.saveCredits(perf);
    _statementDataManager.add(
      ` ${playFor(perf).name}: ${usd(amountFor(perf))} (${perf.audience}석)`
    );
  }

  _statementDataManager.add(`총액: ${usd(totalAmount())}`);
  _statementDataManager.add(`적립 포인트: ${_creditsManager.credits}점`);

  return renderPlainText(_statementDataManager.data);

  function usd(aNumber) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(aNumber / 100);
  }

  function playFor(aPerformance) {
    return plays[aPerformance.playID];
  }

  function statementDataManager(customer) {
    let _data = [`Statement for ${customer}`];

    return {
      add(str) {
        _data.push(str);
      },

      get data() {
        return _data;
      },
    };
  }

  function renderPlainText(statement) {
    return statement.join("\n") + "\n";
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
