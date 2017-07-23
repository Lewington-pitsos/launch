class Atbash
  ALPHABET = %w[a b c d e f g h i j k l m n o p q r s t u v w x y z].freeze

  def self.encode(str)
    str = str.gsub(/[^a-zA-Z0-9]/, "")

    str = translate(str.downcase)

    return_format(str)
  end

  def self.translate(str)
    new_str = str.chars.map do |char|
      if char.match(/[a-z]/) # there won't be any capital letters
        convert_char(char)
      else
        char
      end
    end

    new_str.join
  end

  def self.convert_char(char)
    index = ALPHABET.index(char)
    index = (ALPHABET.length - 1) - index
    ALPHABET[index]
  end

  def self.return_format(str)
    str.scan(/.{0,5}/).join(" ")[0..-2] # there's a trailing space we can't keep
  end
end
