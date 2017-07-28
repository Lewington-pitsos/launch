def array_to_list array
  str="<ul>"
  array.each do |i|
    str += "<li>#{i.strip}</li>"
  end
  str + "</ul>"
end
