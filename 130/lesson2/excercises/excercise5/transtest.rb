require_relative 'transaction.rb'
require 'minitest/autorun'

class TransactionTest < MiniTest::Test

  def setup
    @trans = Transaction.new(30)
  end

  def test_prompt_for_payment
    input = StringIO.new("40\n")
    output = StringIO.new
    @trans.prompt_for_payment(input: input, output: output)
    assert_equal(40, @trans.amount_paid)
  end

end
