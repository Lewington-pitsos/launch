
class Crypto

  def initialize str
    @normal = str.gsub(/[^a-zA-Z0-9]/, "").downcase
    @message = normal.dup
    @length = next_square(message.length)
    @segments = message.scan(/.{0,#{length}}/)[0..-2]
    square
  end

  def normalize_plaintext
    normal
  end

  def ciphertext
    message.gsub(" ", '')
  end

  def normalize_ciphertext
    message
  end

  def plaintext_segments
    segments
  end

  def size
    length
  end

  private

  attr_accessor :message, :length, :segments, :normal

  def square
    coded = ''
    index = 0
    count = 0
    loop do
      letter = message[index]

      if !letter
        coded += " "
        count += 1
        break if count == length
        index = count
        next
      end

      coded += letter
      index += length
    end

    self.message = coded[0..-2]
  end

  def next_square num
    loop do
      return Math.sqrt(num).to_i if Math.sqrt(num) % 1 == 0
      num += 1
    end
  end
end
