require 'minitest/autorun'
require 'minitest/reporters'
MiniTest::Reporters.use!


class BasicTest < MiniTest::Test
  def setup
      @value = "nil"
  end

  def test_downcase
    assert_nil(@value)
  end
end
