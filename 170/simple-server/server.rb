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
  <h1>Counter:</h1>"
end

def end_plate
  "</body>
  </html>"
end



loop do
  client = server.accept

  request_line = client.gets
  count = XTXTXTXTXTXTXTXTXTXT
  puts request_line

  next unless request_line

  client.puts "HTTP/1.1 200 OK" # this is like, the status code
  client.puts "Content-Type: text/html;"
  client.puts
  client.puts boilerplate
  client.puts "<p>The current number is #{count}.</p>"

  client.puts end_plate

  client.close
end
