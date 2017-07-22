require 'minitest/autorun'
require 'minitest/reporters'
Minitest::Reporters.use!

class BasicTest < MiniTest::Test
  def test_valid
    assert(value.odd?)
  end
end
