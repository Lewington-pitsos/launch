def update_data(select_string, &block)
  data = ["hayrry", "burt", "sam"]
  data.each do |employee|
    p block.call(employee)
  end
  #save(data)
end

def update_by_type(type, &block)
  update_data("employee_type = #{type}") {block.call()}
end

def update_by_location(location, &block)
  update_data("employee_location = #{location}") {|employee| block.call(employee)}

end

=begin
# Example calls
update_by_type("Manager") do |employee|
  employee.salary *= 1.25
end
=end

update_by_location("Oregon") do |emp|
  emp + "hey"
end


def update_data(select_string, &block)
  data = fetch(select_string)
  data.each do |employee|
    block.call employee
  end
  save(data)
end

def update_by_type(type, &block)
  update_data("employee_type = #{type}") {|employee| block.call(employee)}
end

def update_by_location(location, &block)
  update_data("employee_location = #{location}") {|employee| block.call(employee)}
end

# Example calls
update_by_type("Manager") do |employee|
  employee.salary *= 1.25
end

update_by_location("Oregon") do |employee|
  employee.salary *= 1.10
end
