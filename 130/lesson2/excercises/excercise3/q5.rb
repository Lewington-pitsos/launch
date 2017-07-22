require 'minitest/autorun'
require 'minitest/reporters'
MiniTest::Reporters.use!


class BasicTest < MiniTest::Test
  def setup
      @employee = 'bob'
  end

  def test_downcase
    assert_raises(*NoExperienceError){@employee.hire}
  end
end
