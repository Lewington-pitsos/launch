class Counter

  def initialize str
    @phrase = str.split(/[^\w]|(\w+'\w)/)
    @phrase.delete("")
  end

  def word_count
    @phrase.each_with_object(Hash.new(0)) { |word, hsh| hsh[word.downcase] += 1}
  end

end

p Counter.new("one,two,thre").word_count
