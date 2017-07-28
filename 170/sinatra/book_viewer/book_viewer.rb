require "sinatra"
require "sinatra/reloader"
require "tilt/erubis"
require_relative "useful.rb"

before do
  @toc = File.readlines "data/toc.txt"
end

get "/" do
  @title = "A disaster for the Phillipeans"
  erb :home
end

get "/chapters/:number" do
  name = params[:number]

  @chap = "Chapter #{name}"
  @chapter_name = @toc[name.to_i - 1]
  @title = @chapter_name
  @chapter = File.read "data/chp#{name}.txt"

  erb :chapter
end

get "/search" do

  @chapters = Dir.glob("data/chp*").map do |path|
    File.read(path)
  end

  @includes = []

  if params[:query]
    @chapters.each_with_index do |chapter, index|
      mini = []
      mini << @toc[index] if chapter.include?(params[:query])
      mini << 
      @includes
    end

    if @includes.empty?
      @sorry = "Sorry, no results found."
    else
      @message = "Results for '#{params[:query]}':"
    end
  end

  erb :search
end

not_found do
  redirect "/"
end

helpers do
  def paragraph(text)
    id = 0
    text.split("\n\n").map do |paragraph|
      "<p id=#{id}>#{paragraph}</p>"
      id += 1
    end.join
  end
end


get "/show/:name" do
  params[:name]
end
