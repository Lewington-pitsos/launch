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

  @chapters = (1..12).to_a.map do |name|
    File.read("data/chp#{name}.txt")
  end

  @includes = {}

  if params[:query]
    @chapters.each_with_index do |chapter, index|
      next unless chapter.include?(params[:query])
      mini = {}
      mini[@toc[index]] = []
      paragraphs = chapter.split("\n\n")

      paragraphs.each_with_index do |i, number|
        if i.include?(params[:query])
          mini[@toc[index]] << {number => i.gsub(params[:query], "<b>#{params[:query]}</b>")}
        end
      end

      @includes[index] = mini
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
    id = -1
    text.split("\n\n").map do |paragraph|
      id += 1
      "<p id=para#{id}>#{paragraph}</p>"
    end.join
  end
end


get "/show/:name" do
  params[:name]
end
