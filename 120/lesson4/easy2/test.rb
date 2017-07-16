class Employee

  attr_reader :name, :type, :time, :num, :vac

  def initialize name, type, num, time, vac
    @name = name
    @type = type
    @num = num
    @time = time
    @vac = vac
  end

  def to_s
    "Name: #{name}\nType: #{type}\nSerial number: #{num}\nVacation Days: #{vac}\n"
  end

end

class FullTime < Employee
  attr_reader :vac, :desk

  def initialize(name, type, num, vac, desk)
    super(name, type, num, "full", vac)
    @desk = desk
  end

  def take_vacation
  end

  def to_s
    super + "Desk: #{desk}"
  end
end

class High < FullTime

  def deligate
  end

end

class Exec < High

  def initialize(name, num)
    super(name, "Executive", num, 20, "Corner Office")
  end

end

class Manager < High

  def initialize(name, num)
    super(name, "Manager", num, 14, "Private Office")
  end

end

class Regular < FullTime
  def initialize(name, num)
    super(name, "Regular", num, 10, "Cubicle")
  end
end

class PartTime < Employee
  def initialize(name, num)
    super(name, "Part-Time", num, "part", 0)
  end
end
