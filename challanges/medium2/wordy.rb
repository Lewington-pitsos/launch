class WordProblem
  attr_reader :problem

  VALIDS = ["multiplied", "divided", "plus", "minus"]

  def initialize str
    @problem = str.split(" ")[2..-1]
    @problem.delete("by")
  end

  #-----------

  attr_writer :problem

  def answer
    while problem.length > 1
      self.problem[0..2] = convert(problem[0..2])
    end
    problem[0].to_i
  end

  def convert array
    convert 3, 4, 5 unless VALIDS.include?(array[1])
    send(array[1], array[0].to_i, array[2].to_i)
  end

  def minus a, b
    (a - b).to_s
  end

  def plus a, b
    (a + b).to_s
  end

  def divided a, b
    (a / b).to_s
  end

  def multiplied a, b
    (a * b).to_s
  end
end
