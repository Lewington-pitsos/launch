=begin
# Group 1
def check_return_with_proc
  my_proc = proc { return }
  my_proc.call
  puts "This will never output to screen."
end


p check_return_with_proc

# if a function executes a proc that has a return statement inside it, that
# method will exit as if the return statement existed within its body


# Group 2
my_proc = proc { return }

def check_return_with_proc_2(my_proc)
  my_proc.call
end

check_return_with_proc_2(my_proc)

# procs cannot contain return values when defined outside of a method
# apparently, unless maybe it exists within a block inside that proc


# Group 3
def check_return_with_lambda
  my_lambda = lambda { return }
  my_lambda.call
  puts "This will be output to screen."
end

check_return_with_lambda

# if a lamda that contains a return statement is executed during a method, it
# will not cause the method to return as if the return was in the method body



# Group 4
my_lambda = lambda { return }
def check_return_with_lambda(my_lambda)
  my_lambda.call
  puts "This will be output to screen."
end

check_return_with_lambda(my_lambda)

# lamdas can contain return statements within their bodies without
# having errors occur

=end
# Group 5

def block_method_3
  yield
end

block_method_3 { return }

# blocks, like procs, seem not to be able to contain return statements, this
# seems to be the case even when they are passed to methods

# Overall: blocks can never contain return statements, procs can only contain
# return statements when they are defined within methods (in which case the
# method seems to read the return statement as if the proc were not there
# anyway, so apparently return statements inside procs behave like return
# statements printed outside of the proc
# lamdas seem to be able to contain return statements just like methods can
