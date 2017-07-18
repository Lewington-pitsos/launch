class Reader

  def read str

    words = seperate str

    return "." if words.empty?

    words = rev words

    add_point(words).join(" ")
  end

  def seperate str

    str.split(/[\s+.]/)

  end

  def rev words
    words.length.times do |i|
      if i.odd?
        words[i] = words[i].reverse
      end
    end

    words
  end

  def add_point array
    array[-1] = array[-1] + "."
    array
  end

  def read_slow str

    rev = false

    chars = str.chars

    whitespace = false

    not_before = 0

    chars.each_with_index do |char, index|
      if index >= not_before
        if char.match(/[a-zA-Z]/)
          if rev == false
            print char
            whitespace = true
          else
            letters = rev_word(chars[index..-1], [], index)
            letters[0].each {|i| print i}
            not_before = letters[1]
            whitespace = true
          end
        elsif char.match(/\s/)
          if whitespace
            unless point_next chars[index+1..-1]
              print char
              whitespace = false
              rev = swap(rev)
            end
          end

        elsif char == "."
          puts char
          exit
        end
      end
    end

  end

  def point_next array
    if array[0] == "."
      return true
    elsif array[0].match(/[a-zA-Z]/)
      return false
    else
      point_next array[1..-1]
    end
  end

  def rev_word array, to_reverse, index

    if array[0].match(/[\s\.]/)

      return to_reverse.reverse, index
    else
      to_reverse << array[0]
      rev_word array[1..-1], to_reverse, index + 1
    end
  end

  def swap var
    if var
     false
    else
      true
    end
  end
end

r = Reader.new



p r.point_next([" ", " ", "k"])

r.read_slow("Hi my name is  garr    harr     .")
