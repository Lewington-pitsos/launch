class SecretHandshake

  CODES = {
    "1" => "wink",
    "10" => "double blink",
    "100" => "close your eyes",
    "1000" => "jump",
    "10000" => "REVERSE",
  }

  attr_accessor :num

  def initialize num
    @num = num

  end

  def commands
    return [] unless guard

    list = []

    code = num.to_s(2).chars.reverse

    code.each_with_index do |char, index|
      list << char + ("0" * index)
    end

    final = []

    list.each do |i|
      if CODES[i]
        final << CODES[i]
      end
    end

    revs = final.count("REVERSE")

    final.delete("REVERSE")

    revs.times do
      final = final.reverse
    end

    final
  end

  def guard
    if num.class == String
      return false unless num.to_i.to_s == num
      self.num = num.to_i
    else
      return false unless num.class == Integer
    end
    true
  end

end

w = SecretHandshake.new("piggies")

p w.commands
