class SecretFile


  def initialize(secret_data)
    @data = secret_data
    @logger = SecurityLogger.new
  end

  def data
    @logger.create_log_entry
    @data
  end

  def check_log
    puts @logger.log
  end

end

class SecurityLogger
  attr_accessor :log

  def initialize
    @log = []
  end

  def create_log_entry
    timestamp = Time.new
    self.log << timestamp
  end
end

w = SecretFile.new("abc")

w.data
sleep 1
w.data
w.data

w.check_log
