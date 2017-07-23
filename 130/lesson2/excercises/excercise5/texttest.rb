require_relative 'text.rb'
require 'minitest/autorun'

class TextTest < MiniTest::Test

  def setup
    @file = File.open("sample.txt", 'r')
  end

  def test_swap
    @object = Text.new(@file.read)
    assert_equal("heppy feet", @object.swap("a", "e"))
  end

  def test_word_count
    text = @file.read
    words = text.split(" ").length
    @object = Text.new(text)
    assert_equal(words, @object.word_count)
  end

  def teardown
    @file.close
  end
end
