class Roman

  CONVERSIONS = {
    1000 => "M",
    900 => "CM",
    500 => "D",
    400 => "CD",
    100 => "C",
    90 => "XC",
    50 => "L",
    40 => "XL",
    10 => "X",
    9 => "IX",
    5 => "V",
    4 => "IV",
    1 => "I"
  }.freeze

  def to_roman n

  roman_num = []

    CONVERSIONS.each do |mag, roman|
      count = 0
      test_num = n
      while loop do
        test_num = n - mag
        if test_num > - 1
          n = test_num
          count += 1
        else
          break
        end
      end
      roman_num << roman * count
    end
    roman_num.delete('')
    roman_num.join()
  end


end

w = Roman.new
p w.to_roman 402
