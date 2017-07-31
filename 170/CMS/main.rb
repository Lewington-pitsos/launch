require "sinatra"
require "sinatra/reloader"
require "tilt/erubis"
# require "sinatra/content_for"

get "/" do
  @file_list = Dir.glob("data/*")

  erb :layout
end
