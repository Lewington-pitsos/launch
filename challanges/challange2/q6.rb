class School


  def initialize
    @students = Hash.new{ |h, k| h[k] = [] }
  end

  def add name, grade
    students[grade] << name

    students[grade].sort!
  end

  def to_h
    students.sort.to_h
  end

  def grade n
    students[n]
  end

  private

  attr_reader :students

end


school = School.new

school.add('Blair', 2)
school.add('James', 3)
school.add('Paul', 2)
school.add('Andy', 2)
p school.to_h
p school.grade(2)
