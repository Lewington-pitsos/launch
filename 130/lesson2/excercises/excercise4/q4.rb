def birds array

  yield *array if block_given?

end

p birds(%w(eagle sparrow velocer Kains)) { |a, b, *c| c }
