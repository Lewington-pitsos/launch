class CircularBuffer

  def initialize num

    @buffer = []

    @limit = num
  end

  def write entry
    if buffer.length == limit
      puts "ERROR: Buffer Full."
    end
    tack_on entry
  end

  def read
    buffer.shift
  end

  def write! entry
    read
    tack_on entry
  end

  def clear
    self.buffer = {}
  end

  private

  def tack_on entry
    unless entry == nil
      buffer << entry
    end
  end

  attr_accessor :buffer
  attr_reader :limit
end


buffer = CircularBuffer.new(5)

('1'..'3').each { |i| buffer.write i }
  p  buffer.read
  p  buffer.read
  p  buffer.write '4'
  p  buffer.read
  p  ('5'..'8').each { |i| buffer.write i }
  p  buffer.write! 'A'
  p  buffer.write! 'B'
    ('6'..'8').each do |i|
      buffer.read == i
    end
  p  buffer.read == "A"
  p  buffer.read == "B"
