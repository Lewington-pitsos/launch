class RunLengthEncoding

  def self.encode str
    narray = []

    count = 1

    prev = nil

    str.chars.each do |char|
      if char == prev
        count += 1
      else
        narray << count if count > 1
        count = 1
        narray << prev
        prev = char
      end
    end

    narray << count if count > 1
    narray << prev

    narray.join
  end

  def self.decode str
    narray = []

    array = str.scan(/[0-9]+|./)

    array.each_with_index do |entry, i|
      if entry.match(/[0-9]+/)
        num = entry.to_i
        (num-1).times do
          narray << array[i + 1]
        end
      else
        narray << entry
      end
    end

    narray.join
  end
end
