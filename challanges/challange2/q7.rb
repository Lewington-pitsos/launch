class Meetup

  DAYS = {
    monday: 1,
    tuesday: 2,
    wednesday: 3,
    thursday: 4,
    friday: 5,
    saturday: 6,
    sunday: 0,

  }.freeze

  attr_reader :month, :year

  def initialize month, year
    @year = year
    @month = month
  end

  def day command, day
    send command day
  end

  def first day
    nth day, 1
  end

  def second day
    nth day, 2
  end

  def third day
    nth day, 3
  end

  def fourth day
    nth day, 4
  end

  def last day
    time = Time.new(year, month)
    last = nil
    31.times do
      time += (60 * 60 * 24)
      last = time if time.wday == DAYS[day]
      break if time.month > month
    end

    last
  end

  def teenth day
    time = Time.new(year, month)
    20.times do
      time += (60 * 60 * 24)
      return time if time.wday == DAYS[day] && time.day > 12
    end
  end

  private

  def nth day, count
    counted = 0
    current_day = 1
    31.times do
      current = Time.new(year, month, current_day)
      if current.wday == DAYS[day]
        counted += 1
        if counted == count
          return current
        end
      end
      current_day += 1
    end
  end



end

meet = Meetup.new(5, 2013)

p meet.day("first", :tuesday)
