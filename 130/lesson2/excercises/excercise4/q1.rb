

class Device
  def initialize
    @recordings = []
  end

  def record(recording)
    @recordings << recording
  end

  def listen
    record yield if block_given?
  end

  def play
    puts @recordings
  end
end


listener = Device.new

listener.listen{ "heyheyhey"}

listener.listen

listener.play
