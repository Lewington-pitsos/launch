=begin
# Group 1
my_proc = proc { |thing| puts "This is a #{thing}." }
puts my_proc
puts my_proc.class
my_proc.call
my_proc.call('cat')

# procs are objects, just like strings and ints and so fourth
# they can be called with "call"
# they can be optionally passed parameters (their arity seems flexible)



# Group 2
my_lambda = lambda { |thing| puts "This is a #{thing}" }
my_second_lambda = -> (thing) { puts "This is a #{thing}" }
puts my_lambda
puts my_second_lambda
puts my_lambda.class
my_lambda.call('dog')
my_lambda.call
my_third_lambda = Lambda.new { |thing| puts "This is a #{thing}" }

# Lamdas are a kind of proc
# lamdas can use a funny kind of syntax (from line 16)
# Lamdas seem to have stricter arity, they throw an error if given less
# arguments than expected
# Lamdas have their own class


# Group 3
def block_method_1(animal)
  yield
end

block_method_1('seal') { |seal| puts "This is a #{seal}."}
block_method_1('seal')

# methods that take blocks have strict arity by default: they need a block to
# be passed or they will throw an error
# they also need to pass the argument they take to the yeild method or else
# the block will not have access to it

=end
# Group 4
def block_method_2(animal)
  yield(animal)
end

block_method_2('turtle') { |turtle| puts "This is a #{turtle}."}
block_method_2('turtle') do |turtle, seal|
  puts "This is a #{turtle} and a #{seal}."
end
block_method_2('turtle') { puts "This is a #{animal}."}

# blocks themselves have leniant arity, and will allow fewer arguments to be
# passed to them than expected without throwing an error
# they do however, need some kind of argument to be specififed at the beginning
# of the block if that argument gets referred to in the block, they can't just
# rely on what the method is/was doing
