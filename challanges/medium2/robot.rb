class Robot
  @@names = []

  attr_reader :name

  def initialize
    reset
  end

  def reset
    @name = new_name
    @@names << name
  end

  private

  def r_name
    nums = rand(100..999).to_s
    letters = ((65 + rand(26)).chr) + ((65 + rand(26)).chr)
    letters.upcase + nums
  end

  def new_name
    loop do
      name = r_name
      return name unless @@names.include?(name)
    end
  end
end

p Robot.new.name
