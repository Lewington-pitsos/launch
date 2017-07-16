module Describable
  def describe_shape
    "I am a #{self.class} and have #{SIDES} sides."
  end
end

class Shape
  self::SIDES = 4

  include Describable

  def sides
    SIDES
  end

  def self.sides
    SIDES
  end
end

class Quadrilateral < Shape

end

class Square < Quadrilateral; end


p Square.new.sides # => 4



p Square.new.sides # => 4


p Square.new.describe_shape # => "I am a Square and have 4 sides."
