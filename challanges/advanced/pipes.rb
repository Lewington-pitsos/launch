class OCR

  CONVERSIONS = {
    [" _ ", "| |", "|_|"] => "0",
    ["   ", "  |", "  |"] => "1",
    [" _ ", " _|", "|_ "] => "2",
    [" _ ", " _|", " _|"] => "3",
    ["   ", "|_|", "  |"] => "4",
    [" _ ", "|_ ", " _|"] => "5",
    [" _ ", "|_ ", "|_|"] => "6",
    [" _ ", "  |", "  |"] => "7",
    [" _ ", "|_|", "|_|"] => "8",
    [" _ ", "|_|", " _|"] => "9",
  }

  attr_reader :text, :length

  def initialize txt
    @text = txt.split("\n")
    @length = text.max{|a, b| a.length <=> b.length}.length
    fix
  end

  def minitexts
    number = (text.length + 1) /4

    megatext = []
    num = 0

    number.times do
      megatext << text[num, 4]
      num += 4
    end
    megatext
  end

  def big_convert megatext
    str = ""
    megatext.each do |i|
      str += get_all i
      str += ","
    end
    str
  end

  def too_long?
    text.length > 5
  end

  def convert
    if too_long?
      return big_convert(minitexts)[0..-2]
    end
    get_all
  end

  protected

  def fix
    text.map! do |i|
      if i[-1] == "|"
        i
      else
        i + " " * (length - i.length)
      end
    end
  end

  def get_all txt=@text
    final = ""
    num = 0
    while num < length
      final += get_digit(num, txt)
      num += 3
    end
    final
  end

  def get_digit num, txt
    digit = []
    array = 0
    3.times do
      digit << txt[array][num, 3]
      array += 1
    end
    reduce(digit)
  end

  def reduce digit
    CONVERSIONS[digit] ? CONVERSIONS[digit] : "?"
  end

end
