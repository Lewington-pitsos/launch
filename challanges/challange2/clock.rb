class ClockRecord

  def initialize hour, min
    @hour = hour
    @min = min
  end

  def +(num)
    minutes = num % 60
    hours = num / 60
    @min.add(minutes)
    @hour.add(hours)
    self
  end

  def -(num)
    minutes = num % 60
    hours = num / 60
    hours += 1 if minutes > @min.time
    @min.less(minutes)
    @hour.less(hours)
    self
  end

  def to_s
    hr = "%02i" % @hour.time
    mn = "%02i" % @min.time
    "#{hr}:#{mn}"
  end

  def ==(other)
    self.to_s == other.to_s
  end
end

class Clock
  def self.at hours=0, minutes = 0
    ClockRecord.new(Hour.new(hours), @min = Minute.new(minutes))
  end
end

class TimeUnit
  attr_reader :time

  def initialize time, max
    @max = max

    @time = 0

    add(time)
  end

  def add time
    @time += time
    while @time > @max
      @time -= @max
    end
  end

  def less time
    @time -= time
    while @time < 0
      @time += @max
    end
  end
end

class Hour < TimeUnit
  def initialize time
    super(time, 24)
  end

  def add time
    super
    @time = 0 if @time == 24
  end

  def less time
    super
    @time = 0 if @time == 24
  end
end

class Minute < TimeUnit
  def initialize time
    super(time, 60)

  end
end

s = Clock.at(24, 30)

puts s
