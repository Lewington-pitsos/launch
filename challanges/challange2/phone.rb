class PhoneNumber


  def initialize str
    @num = str
  end

  def number
    return proper if valid?
    "0000000000"
  end

  def area_code
    number[0..2]
  end

  def to_s
    n = number
    "(#{n[0..2]}) #{n[3...6]}-#{n[6..9]}"
  end


  def valid?
    return false if @num.match(/[a-zA-Z]/)

    @num.gsub!(/[^0-9]/, "")

    return true if @num.length == 10

    return true if @num.length == 11 && @num[0] == "1"

    false
  end

  def proper
    if @num.length == 11
      @num[1..11]
    else
      @num
    end
  end

end
=begin
w = PhoneNumber.new '(123) 456-7890'

p w.number
=end
