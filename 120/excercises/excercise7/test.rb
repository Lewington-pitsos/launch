module HasClub

  @@club = "ol' whakkey"

end

module Stabbable
  def unsheath
    p "h"
  end
end

class Killer
  include HasClub

  def initialize
    @gun = "fff"
  end

  KNIFE = "ol' Stabby"

  @@gun = "ol' Shooty"

end

class Jack < Killer
  def unsheath
    p KNIFE
  end
end

class Duterte < Killer
  CLUB = "y"

  include Stabbable



  def draw
    p @@gun
  end

  def reveal
    p @@club
  end
end
j = Jack.new

d = Duterte.new

d.draw

d.reveal

d.unsheath
