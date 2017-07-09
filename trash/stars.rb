def star n
  space = n-3

  edge = 0
  middle = space/2

  half1 edge, middle

  puts "*" * n

  middle = 0
  edge = space/2
  half2 edge, middle

end

def pline edge, middle
  puts "#{" " * edge}*#{" " * middle}*#{" " * middle}*#{" " *edge}"
end

def half1 edge, middle
  until middle == -1


    pline edge, middle

    edge += 1
    middle -= 1
  end
end

def half2 edge, middle
  until edge == -1


    pline edge, middle

    edge -= 1
    middle += 1
  end
end

star(21)
