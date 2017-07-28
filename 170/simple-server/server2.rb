require "socket"
require_relative "basic-param.rb"

server = TCPServer.new("localhost", 3003)

def boilerplate
  "<!DOCTYPE html>
  <html>
  <head>
  <title> This Is Sparta!!! </title>
  </head>
  <body>
  <h1>Earth and water... you'll find plenty down there</h1>"
end

def end_plate
  "</body>
  </html>"
end


loop do
  client = server.accept

  request_line = client.gets

  elements = split_request request_line

  params = intreperate_params elements["params"]

  count = params["count"]

  puts request_line

  next unless request_line

  client.puts "HTTP/1.1 200 OK" # this is like, the status code
  client.puts "Content-Type: text/html;"
  client.puts
  client.puts boilerplate
  client.puts "<p>The current number is #{count}.</p>"

  client.puts "<a href='?count=#{count + 1}'>Add one</a>"
  client.puts "<a href='?count=#{count - 1}'>Subtract one</a>"

  client.puts end_plate

  client.close
end
