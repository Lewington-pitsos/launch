class House

  @@str = ""

  def self.recite
    verse = 11
    11.downto(0).each do |i|
      self.verse i
    end

    @@str
  end


  private

  def self.verse verse
    verse = verse
    number = 11-verse
    @@str += "This is #{pieces[verse][0]}\n"
    number.times do
      @@str += "#{pieces[verse][1]} #{pieces[verse + 1][0]}\n"
      verse += 1
    end
      @@str += "\n"
    end


  def self.pieces
    [
      ['the horse and the hound and the horn', 'that belonged to'],
      ['the farmer sowing his corn', 'that kept'],
      ['the rooster that crowed in the morn', 'that woke'],
      ['the priest all shaven and shorn', 'that married'],
      ['the man all tattered and torn', 'that kissed'],
      ['the maiden all forlorn', 'that milked'],
      ['the cow with the crumpled horn', 'that tossed'],
      ['the dog', 'that worried'],
      ['the cat', 'that killed'],
      ['the rat', 'that ate'],
      ['the malt', 'that lay in'],
      ['the house that Jack built.']
    ]
  end
end


House.recite
