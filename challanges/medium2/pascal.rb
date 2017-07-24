class Triangle

  attr_reader :rows

  def initialize num
    @rows = [[1]]
    (num - 1).times do
      new_row rows[-1]
    end
  end

  def new_row prev
    row = []
    row << 1
    (prev.length - 1).times do |index|
      row<< prev[index+1] + prev[index]
    end
    row << 1
    rows << row
  end

end
