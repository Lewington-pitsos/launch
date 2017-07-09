def trans arr

  narray = []

  arr.length.times do |inner|

    mini = []

    arr.length.times do |outer|
      mini << arr[outer][inner]
    end

    narray << mini
  end

  narray
end

a = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
]

p trans a
