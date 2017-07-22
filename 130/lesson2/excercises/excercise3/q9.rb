require 'minitest/autorun'
require 'minitest/reporters'
MiniTest::Reporters.use!


class BasicTest < MiniTest::Test
  def setup
      @employee = 9
  end

  def test_downcase
    refute_includes([3, 4, 8], @employee)
  end
end
