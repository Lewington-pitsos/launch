def block
  block_given? ? yield : "Does not compute"
end

p block {65 + 8}
