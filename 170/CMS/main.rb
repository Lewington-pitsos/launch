require "sinatra"
require "sinatra/reloader"
require "tilt/erubis"
require_relative "methods.rb"
require "yaml"
# require "sinatra/content_for"

configure do
  enable :sessions
  set :session_secret, "secret"
  use Rack::Session::Cookie, key: 'rack.session',
                         path: '/',
                         secret: 'secret'
end

def data_path
  if ENV["RACK_ENV"] == "test"
    "test/data/"
  else
    "data/"
  end
end

def setup_file path
  @file_saught = path[2]
  @suffix = identify_suffix @file_saught

  unless @file_list.include?(@file_saught)
    session[:error] = "#{@file_saught} does not exist."
    redirect '/index'
  end

  @file = File.read("#{data_path}#{@file_saught}")
end

before do
  @file_list = Dir.glob("#{data_path}*").map {|file| File.basename(file)}
  path = request.env["PATH_INFO"].split("/")

  pass unless (path[1]) == "file"
  setup_file path

end

not_found do
  session[:error] = "this path does not exist"
  redirect "/index"
end

get "/" do
  redirect "/index"
end

 post "/sign_out" do
  session[:logged_in] = false
  session[:success] = "You have been signed out"

  redirect "/index"
end

get "/index" do
  erb :index, layout: :layout
end

get "/login" do
  erb :login
end

post "/validate" do
  @username = params[:username]
  @password = params[:password]

  all_users = YAML.load_file "#{data_path}config.yaml"
  all_users.each do |user, pass|
    if @username == user && @password == pass
      session[:success] = "Welcome!"
      session[:logged_in] = @username
      redirect "/index"
    end
  end

  session[:error] = "Invalid Credentials"
  erb :login
end

get "/file/:filename" do
  headers["Content-Type"] = FILE_TREATMENT[@suffix]
  render_file_type @file, @suffix
end

get "/file/:filename/edit" do
  logged_in_checkpoint session[:logged_in]
  erb :edit
end

get "/new" do
  logged_in_checkpoint session[:logged_in]
  erb :new
end

post "/file/:filename/edit" do
  check_admin session[:logged_in], "/file/config.yaml/edit" if @file_saught == "config.yaml"
  logged_in_checkpoint session[:logged_in]
  @content = params[:file_content]

  File.open "#{data_path}#{@file_saught}", "w" do |file|
    file.write(@content)
  end

  session[:success] = "#{@file_saught} has been updated."
  redirect "/index"
end

post "/new" do
  logged_in_checkpoint session[:logged_in]
  @name = params[:file_name].strip

  if error = new_file_invalidate(@name)
    session[:error] = error
    redirect "/new"
  end

  new_file = File.new("#{data_path}#{@name}", "w")
  new_file.close

  session[:success] = "#{@name} was created."

  redirect "/index"
end

post "/file/:filename/delete" do
  check_admin session[:logged_in], "/index" if @file_saught == "config.yaml"
  logged_in_checkpoint session[:logged_in]

  File.delete("#{data_path}#{@file_saught}")

  session[:success] = "#{@file_saught} was deleted."

  redirect "/index"
end
