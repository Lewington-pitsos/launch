var invoices = {
  unpaid: [],
  paid: [],
  add: function(debtor, debt) {
    this.unpaid.push({ name: debtor, amount: debt});
  },
  totalDue: function() {
    return this.unpaid.reduce((total, element) => element.amount + total, 0);
  },
  payInvoice: function(name) {
    var paid = this.paid;
    this.unpaid = this.unpaid.filter(function(element){
      if (element.name === name) {
        paid.push(element);
        return false;
      } else {
        return true;
      }
    });
  },
  totalPaid: function() {
    return this.paid.reduce((total, element) => element.amount + total, 0);
  },
}

console.log(invoices);
invoices.add("Due North Development", 250)
console.log(invoices);
invoices.add("Moonbeam Interactive", 187.50)
invoices.add("Slough Digital", 300)

invoices.payInvoice("Slough Digital");
invoices.payInvoice("Due North Development");
console.log(invoices);
console.log(invoices.totalPaid());
console.log(invoices.totalDue());
