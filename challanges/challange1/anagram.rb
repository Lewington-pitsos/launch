class Anagram

  attr_reader :word, :chars

  def initialize word
    @word = word.downcase
    @chars = @word.chars.sort

  end

  def match array
    array.select{|i| anagram? i.downcase}
  end

  private

  def anagram? candidate
    candidate != word && candidate.chars.sort == chars
  end
end
