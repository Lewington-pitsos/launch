require_relative 'cash-reg.rb'
require_relative 'transaction.rb'
require 'minitest/autorun'

class CashRegisterTest < MiniTest::Test

  def setup
    @register = CashRegister.new(100)
    @transaction = Transaction.new(30)
    @transaction.amount_paid = (45)
  end

  def test_accept_money
    @register.accept_money(@transaction)
    assert_equal(145, @register.total_money)
  end

  def test_change
    assert_equal(15, @register.change(@transaction))
    assert_equal(100, @register.total_money)
  end

  def test_give_receipt
    assert_nil(@register.give_receipt(@transaction))
    assert_output("You've paid $#{@transaction.item_cost}.\n") \
    {@register.give_receipt(@transaction)}
  end

end
