class Cipher

  ALPHABET = %w[a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z].freeze

  attr_reader :key, :current
  attr_writer :current

  def initialize key=nil
    @key = key || make_key
    @current = 0
  end

  def make_key
    str = ""
    100.times do
      str += rand(97..122).chr
    end
    str
  end

  def encode str
    self.current = 0
    str.chars.map {|i| convert i}.join
  end

  def decode str
    self.current = 0
    str.chars.map {|i| deconvert i}.join
  end

  def convert char
    index = ALPHABET.index(char) + ALPHABET.index(key[current])
    self.current += 1
    ALPHABET[index]
  end

  def deconvert char
    index = ALPHABET.index(char) - ALPHABET.index(key[current])
    self.current += 1
    ALPHABET[index]
  end


end
