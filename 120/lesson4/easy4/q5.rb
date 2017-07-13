class KrispyKreme
  def initialize(filling_type="plain", glazing)
    @filling_type = filling_type
    @glazing = glazing
    fill
  end

  def fill
    @filling_type = "Plain" unless @filling_type
  end

  def present
    if @glazing
      "#{@filling_type} with #{@glazing}"
    else
      "#{@filling_type}"
    end
  end

  def to_s
    present
  end

end

donut1 = KrispyKreme.new(nil, nil)
donut2 = KrispyKreme.new("Vanilla", nil)
donut3 = KrispyKreme.new(nil, "sugar")
donut4 = KrispyKreme.new(nil, "chocolate sprinkles")
donut5 = KrispyKreme.new("Custard", "icing")

puts donut1


puts donut2


puts donut3


puts donut4


puts donut5
