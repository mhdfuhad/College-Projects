const datefn = require("date-fns");

const getLastPaymentDate = (dates) => {
  const currDate = new Date();
  const arrayOfNewDates = dates.map((date) => {
    return datefn.setMonth(datefn.parseISO(date), currDate.getMonth());
  });

  const lastPayment = arrayOfNewDates.reduce((a, b) => {
    return a > b ? a : b;
  });
  return lastPayment;
};

const getNextPaymentDate = (dates) => {
  const currDate = new Date();
  const arrayOfNewDates = dates.map((date) => {
    return datefn.setMonth(datefn.parseISO(date), currDate.getMonth() + 1);
  });

  const nextPaymentDate = datefn.closestTo(currDate, arrayOfNewDates);
  return nextPaymentDate;
};

const getPaymentAmountOnDate = (date, subscriptions) => {
  const paymentAmount = subscriptions.reduce((acc, curr) => {
    if (
      datefn.getDate(datefn.parseISO(curr.dateSubscribed)) ===
      datefn.getDate(date)
    ) {
      return acc + curr.amount;
    } else {
      return acc;
    }
  }, 0);

  return paymentAmount;
};

const getExpiringSoon = (subscriptions) => {
  const currDate = new Date();
  const newSubs = subscriptions.filter((sub) => sub.recurring === false);

  const arrayOfNewDates = newSubs.map((date) => {
    return datefn.setMonth(
      datefn.parseISO(date.dateSubscribed),
      currDate.getMonth() + 1
    );
  });

  const expiringSoonDate = datefn.closestTo(currDate, arrayOfNewDates);

  const expiringSoon = newSubs.filter((sub) => {
    if (
      datefn.getDate(datefn.parseISO(sub.dateSubscribed)) ===
      datefn.getDate(expiringSoonDate)
    ) {
      return sub;
    }
  });

  const expiringSoonArrau = expiringSoon.map((sub) => {
    return sub.platform;
  });

  return expiringSoonArrau;
};

const mostExpensiveSubscription = (subscriptions) => {
  const mostExpensiveSubscription = subscriptions.reduce(
    (acc, curr) => {
      return acc.amount > curr.amount ? acc : curr;
    },
    { amount: 0 }
  );

  return {
    amount: mostExpensiveSubscription.amount,
    platform: mostExpensiveSubscription.platform,
  };
};

const leastExpensiveSubscription = (subscriptions) => {
  const leastExpensiveSubscription = subscriptions.reduce((acc, curr) => {
    return acc.amount < curr.amount ? acc : curr;
  });

  return {
    amount: leastExpensiveSubscription.amount,
    platform: leastExpensiveSubscription.platform,
  };
};

const getMostRecentSubscription = (subscriptions) => {
  const mostRecentSubscription = subscriptions.reduce((acc, curr) => {
    return acc.createdAt > curr.createdAt ? acc : curr;
  });

  return mostRecentSubscription.platform;
};

const getOldestSubscription = (subscriptions) => {
  const oldestSubscription = subscriptions.reduce((acc, curr) => {
    return acc.createdAt < curr.createdAt ? acc : curr;
  });

  return oldestSubscription.platform;
};

const amountsCategories = (subscriptions) => {
  const categories = subscriptions.reduce((acc, curr) => {
    if (!acc.includes(curr.category)) {
      acc.push(curr.category);
    }
    return acc;
  }, []);

  var categoryAmounts = [];
  // get the amount for each category
  for (let i = 0; i < categories.length; i++) {
    const category = categories[i];
    const amount = subscriptions.reduce((acc, curr) => {
      if (curr.category === category) {
        return acc + curr.amount;
      } else {
        return acc;
      }
    }, 0);

    categoryAmounts.push({
      category: category,
      amount: amount,
    });
  }

  // most expensive category
  const mostExpensiveCategory = categoryAmounts.reduce(
    (acc, curr) => {
      return acc.amount > curr.amount ? acc : curr;
    },
    { amount: 0 }
  );

  // least expensive category
  const leastExpensiveCategory = categoryAmounts.reduce((acc, curr) => {
    return acc.amount < curr.amount ? acc : curr;
  });

  return {
    mostExpensiveCategory: mostExpensiveCategory,
    leastExpensiveCategory: leastExpensiveCategory,
    categories: categoryAmounts,
  };
};

module.exports.getReportData = (subscriptions) => {
  // Calculating and getting all the data for the reports
  const totalPaymentCurrentMonth = subscriptions.reduce((acc, curr) => {
    return acc + curr.amount;
  }, 0);

  const lastPaymentDate = getLastPaymentDate(
    subscriptions.map((sub) => {
      return sub.dateSubscribed;
    })
  );

  const nextPaymentDate = getNextPaymentDate(
    subscriptions.map((sub) => {
      return sub.dateSubscribed;
    })
  );

  const lastPaymentAmt = getPaymentAmountOnDate(lastPaymentDate, subscriptions);
  const nextPaymentAmt = getPaymentAmountOnDate(nextPaymentDate, subscriptions);
  const expiringSoon = getExpiringSoon(subscriptions);
  const expensiveSub = mostExpensiveSubscription(subscriptions).platform;
  const leastExpensiveSub = leastExpensiveSubscription(subscriptions).platform;
  const expensiveSubAmt = mostExpensiveSubscription(subscriptions).amount;
  const leastExpensiveSubAmt = leastExpensiveSubscription(subscriptions).amount;
  const mostRecentSub = getMostRecentSubscription(subscriptions);
  const oldestSub = getOldestSubscription(subscriptions);
  const categoryData = amountsCategories(subscriptions);

  return {
    totalPaymentCurrentMonth,
    lastPaymentDate,
    lastPaymentAmt,
    nextPaymentDate,
    nextPaymentAmt,
    expensiveSub,
    leastExpensiveSub,
    expensiveSubAmt,
    leastExpensiveSubAmt,
    mostRecentSub,
    oldestSub,
    expiringSoon,
    categoryData,
  };
};
