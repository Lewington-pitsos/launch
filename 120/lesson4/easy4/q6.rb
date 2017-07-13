class Computer
  attr_accessor :template

  def create_template
    @template = "template 14231"
  end

  def show_template
    template
  end
end

class Computer
  attr_accessor :template

  def create_template
    self.template = "template 14231"
  end

  def show_template
    self.template
  end
end

# in the first instance we change the value of template by directly setting the
# instance varible @template to the string, while in the second instance, we
# call the template setter method which we have by virtue of the attr_reader
# to call on the @template instance variable for us

# lines 9 and 21 both do exactly the same thing by calling on the getter method
# set up by attr_accesor, the onyl difference is that 21 explicitly references
# the calling object, while 9 does this implicitly
