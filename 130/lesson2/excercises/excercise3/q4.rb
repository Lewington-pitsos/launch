require 'minitest/autorun'
require 'minitest/reporters'
MiniTest::Reporters.use!


class BasicTest < MiniTest::Test
  def setup
      @value = [8]
  end

  def test_downcase
    assert_empty(@value)
  end
end
