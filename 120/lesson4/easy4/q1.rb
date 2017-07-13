class BankAccount
  attr_reader :balance

  def initialize(starting_balance)
    @balance = starting_balance
  end

  def positive_balance?
    balance >= 0
  end
end

# ben is right, beacause we have attr_reader on line 2 just the word balance by
# itself has the return value of @balance, so it can be used without the @
# for comparisons like this
# get rekt Alyssa
