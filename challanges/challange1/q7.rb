class Hamming
  def initialize str
    @first = str.chars
  end


  def hamming_distance str

    count = 0

    str.chars.each_with_index  do |char, index|
      break unless @first[index]
      count += 1 if char != @first[index]
    end
    count

  end

end

p Hamming.new('ACT').hamming_distance('GGAGG')
