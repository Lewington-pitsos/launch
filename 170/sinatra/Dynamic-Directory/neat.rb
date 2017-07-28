Dir.chdir("Dynamic-Directory")

files = Dir.glob("public/*").map do |i|
  i.match(/(?<=\/).+$/)
end

p files
