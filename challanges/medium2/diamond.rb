class Diamond

  @@alpha = ("A".."Z").to_a

  @@middle = 1

  def self.make_diamond letter

    return "A\n" if letter == 'A'

    index = @@alpha.index(letter)

    tracker = index.dup

    letter_index = 1


    str = "#{" " * (index-1)}#{"A"}#{" " * (index-1)}\n"

    tracker.times do
      letter = @@alpha[letter_index]
      str += "#{" " * (index-1)}#{letter}#{" "* @@middle}#{letter}#{" " * (index-1)}"
      str += "\n"
      @@middle += 2
      index -= 1
      letter_index += 1
    end

    tracker -= 1

    @@middle -= 4

    index += 2

    letter_index -= 2

    tracker.times do
      letter = @@alpha[letter_index]
      str += "#{" " * (index-1)}#{letter}#{" "* @@middle}#{letter}#{" " * (index-1)}"
      str += "\n"
      @@middle -= 2
      index += 1
      letter_index -= 1
    end
    @@middle = 1
    str += "#{" " * index}#{"A"}#{" " * index}\n"
  end

end
