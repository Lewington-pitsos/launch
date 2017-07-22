require 'minitest/autorun'
require 'minitest/reporters'
MiniTest::Reporters.use!


class BasicTest < MiniTest::Test
  def setup
      @employee = 9
  end

  def test_downcase
    assert_same(@employee, @employee.process)
  end
end
