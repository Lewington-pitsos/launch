def zip_arrays arr1, arr2
  arr1.zip(arr2).flatten
end

a = [2, 3, 4]
b = [5, 6, 7]

p zip_arrays a, b

def zarrays arr1, arr2
  index = 0

  narray = arr1.map do |_|
    mini = []
    mini << arr1[index]
    mini << arr2[index]

    index += 1

    mini
  end


  narray.flatten
end

p zarrays a, b
