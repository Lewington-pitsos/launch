def step start=0, finish=0, step=1

  count = 0

  while start <= finish
    yield start
    start += step
    count += 1
  end

  count
end


step(1, 10, 3) { |value| puts "value = #{value}" }


# this returns the number of iteraions, because that seems likely to be the
# most useful peice of information to do with the whole process
