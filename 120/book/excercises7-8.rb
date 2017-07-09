class Student
  attr_reader :name

  def initialize name, grade
    @name = name
    @grade = grade
  end

  def better_than? student
    grade > student.grade
  end

  protected


  def grade
    @grade
  end
end

joe = Student.new("joe", 77)

p joe.name

paul = Student.new("paul", 60)

p joe.better_than?(paul)
