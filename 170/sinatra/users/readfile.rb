require "yaml"

def read_out filename = "data/users.yaml"
  YAML.load_file filename
end
