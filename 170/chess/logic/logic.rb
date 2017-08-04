require "yaml"

def read_yaml filename
  YAML.load_file filename
end

def write_yaml array, filename
  File.open filename, "w" do |file|
    file.write array.to_yaml
  end
end
