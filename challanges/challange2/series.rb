class Series

  def initialize digits
    @digits = digits
  end



  def slices(len)
    array = @digits.chars.map {|i| i.to_i}.sort

    consecs = []

    while array.length >= len
      if check_nxt array, len
        consecs << array[0..len-1]
      end
      array = array[1..-1]
    end

    consecs
  end

  def consec? n, nxt
    nxt == n + 1
  end

  def check_nxt array, length
    index = 0

    (length - 1).times do
      return false unless consec? array[index], array[index+1]
      index += 1
    end

    true
  end
end
