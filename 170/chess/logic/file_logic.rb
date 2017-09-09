require "yaml"

# all this does is make reading and writing files with yaml slightl easier

def read_yaml filename
  YAML.load_file filename
end

def write_yaml array, filename
  File.open filename, "w" do |file|
    file.write array.to_yaml
  end
end

def data_path
  if ENV["RACK_ENV"] == "test"
    "test/data/"
  else
    "data/"
  end
end
