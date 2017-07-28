request = "GET /?rolls=3&sides=7 HTTP/1.1"


def split_request str
  array = str.split(/[ ?]/)
  hash = {
    "method" => array[0],
    "path" => array[1],
    "params" => array[2],
    "version" => array[3]
  }
end

def intreperate_params str
  delimiter = "&"
  str = str.split(delimiter).map { |e| e.split("=") }
  arguments = {
    "rolls" => 1,
    "sides" => 6,
    "count" => 0
  }
  str.each do |i|
    arguments[i[0]] = i[1].to_i if arguments[i[0]]
  end
  arguments
end
