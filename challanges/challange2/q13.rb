class BeerSong



  def verse num, finish=num-1



    while num > 2 && num > finish
      print "#{num} bottles of beer on the wall, #{num} bottles of beer!\n" \
      "Take one down and pass it around, #{num-1} bottles of beer on the wall!\n\n"
      num -= 1
    end

    while num > finish && num > 1
      print "#{num} bottles of beer on the wall, #{num} bottles of beer!\n" \
      "Take one down and pass it around, #{num-1} bottle of beer on the wall!\n\n"
      num -= 1
    end

    while num > finish && num > 0
      print "#{num} bottle of beer on the wall, #{num} bottle of beer!\n" \
      "Take it down and pass it around, no more bottles of beer on the wall!\n\n"
      num -= 1
    end

    while num == 0
      print "No more bottle of beer on the wall, No more bottle of beer!\n" \
      "Go to the store and buy some more, 99 bottles of beer on the wall!\n\n"
      num -=1
    end

  end

end

BeerSong.new.verse(0)
