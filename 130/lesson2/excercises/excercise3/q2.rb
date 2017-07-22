require 'minitest/autorun'
require 'minitest/reporters'
MiniTest::Reporters.use!


class BasicTest < MiniTest::Test
  def setup
      @value = "XYZ"
  end

  def test_downcase
    assert_equal("xyz", @value.downcase)
  end
end
