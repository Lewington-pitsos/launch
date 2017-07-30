require "sinatra"
require "sinatra/reloader"
require "tilt/erubis"

require_relative "readfile.rb"

before do
  @page_title = "Home Page"
  @title = "Welcome to User Tracker"

  @users = read_out
  @user_num = @users.length
  @hobby_num = count_hobbies @users
end

get "/" do
  redirect "/list"
end

get "/list" do


  erb :list
end

get "/user/:name" do
  name = params[:name]
  @user = @users[name.to_sym]

  redirect "/" unless @user

  @others = @users.keys - [name.to_sym]

  @title = name
  @page_title = "#{name}'s page'"

  erb :userpage
end

not_found do
  redirect "/"
end

helpers do
  def count_hobbies user_list
    count = 0

    user_list.each do |key, _|
      count += user_list[key][:interests].length
    end

    count
  end

end
