function makeObj() {
  var obj = {
    propA: 10,
    probB: 20
  };
  return obj;
}

function createInvoice(services={}) {
  function acceptPayment(payment) {
    this.amount += payment.final;
    console.log(this.amount);
  }
  return {
    phone: services.phone || 3000,
    internet: services.internet || 5500,
    amount: 0,
    total: function() {
      return this.phone + this.internet;
    },
    addPayment: function(payment) {
      console.log(payment);
      acceptPayment.call(this, payment);
    },
    addPayments: function(payments) {
      payments.forEach(acceptPayment.bind(this));
    },
    amountDue: function() {
      return this.total() - this.amount;
    }
  }
}

function invoiceTotal(invoices) {
  var total = 0;
  for (var i = 0; i < invoices.length; i++) {
    total += invoices[i].total();
  }

  return total;
}

var invoices = [];
invoices.push(createInvoice());
invoices.push(createInvoice({
 internet: 6500
}));

invoices.push(createInvoice({
 phone: 2000
}));

invoices.push(createInvoice({
  phone: 1000,
  internet: 4500
}));

console.log(invoiceTotal(invoices));

function createPayment(services={}) {
  var final = Object.values(services)
    .reduce((total, value) => value + total, 0);
  return {
    final: final,
    total: function() {
      return final;
    }
  }
}

function paymentTotal(payments) {
  var total = 0;
  for (var i = 0; i < payments.length; i++) {
    total += payments[i].total();
  }

  return total;
}

var payments = [];
payments.push(createPayment());
payments.push(createPayment({
  internet: 6500
}));

payments.push(createPayment({
  phone: 2000
}));

payments.push(createPayment({
  phone: 1000, internet: 4500
}));

payments.push(createPayment({
  amount: 10000
}));

console.log(paymentTotal(payments));      // 24000

var invoice = createInvoice({
  phone: 1200,
  internet: 4000
});

var payment1 = createPayment({
  amount: 2000
});

var payment2 = createPayment({
  phone: 1000,
  internet: 1200
});

var payment3 = createPayment({
  phone: 1000
});

invoice.addPayment(payment1)
invoice.addPayments([payment2, payment3]);
console.log(invoice.amountDue());       // this should return 0
