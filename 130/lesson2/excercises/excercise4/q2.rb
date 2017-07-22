class TextAnalyzer
  FILE = "textfile.rb"
  def process
    yield readin FILE
  end

  def readin filename
    text = File.read filename
  end

end


analyzer = TextAnalyzer.new
analyzer.process { |t| puts "#{t.split("\n\n").count} Paragraphs" }
analyzer.process { |t| puts "#{t.split("\n").count} Lines" }
analyzer.process { |t| puts "#{t.split(" ").count} Words"}
