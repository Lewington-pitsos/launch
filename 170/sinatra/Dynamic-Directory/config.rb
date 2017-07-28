require "sinatra"
require "sinatra/reloader"
require "tilt/erubis"

get "/" do
  @files = Dir.glob("public/*").map do |i|
    File.basename(i)
  end

  erb :list
end

get "/ascending" do
  @files = Dir.glob("public/*").map do |i|
    File.basename(i)
  end

  @files = @files.sort

  erb :list
end

get "/descending" do
  @files = Dir.glob("public/*").map do |i|
    File.basename(i)
  end

  @files = @files.sort.reverse

  erb :list
end
