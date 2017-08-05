require "sinatra"
require "sinatra/reloader"
require "tilt/erubis"
require_relative "logic/player"
require_relative "logic/sorters"
require_relative "logic/file_logic"

configure do
  enable :sessions
  set :session_secret, "secret"
  use Rack::Session::Cookie, key: 'rack.session',
                         path: '/',
                         secret: 'secret'
end



before do

end

get "/new_player" do

  erb :new_player
end

post "/new_player" do

  session[:list] << Player.new({name: params[:name], score: params[:score].to_f})

  session[:success] = "#{params[:name]} added to tourniment"

  redirect "/new_player"
end

get "/load" do
  @files = Dir.glob("#{data_path}*").map {|file| File.basename(file)}
  erb :file_list
end

post "/load/:filename" do
  session[:list] = read_yaml "#{data_path}#{params[:filename]}"

  session[:success] = "#{params[:filename]} successfully loaded"

  redirect "/players"
end

get "/players" do
  @player_list = Sorter.new(session[:list]).players
  erb :player_list
end

get "/new_round" do
  playing = session[:list].select {|i| i.playing}
  list = Sorter.new(playing)
  @round = Round.new(list.pairs)
  session[:round] = @round

  erb :round
end

get "/round" do
  @round = session[:round]

  erb :round
end

not_found do
  redirect "/players"
end

post "/win/:name" do
  session[:round].win params[:name]

  redirect "/round"
end

post "/undo_win/:name" do
  session[:round].undo_win params[:name]

  redirect "/round"
end

post "/finish" do
  session[:round].finish_round

  redirect "/players"
end

post "/save" do
  write_yaml session[:list], "#{data_path}#{params[:filename] + '.yaml'}"

  session[:success] = "File Written"

  redirect "/players"
end

post "/toggle/:name" do

  session[:list].each do |player|
    player.toggle if player.name == params[:name]
  end

  redirect "players"
end

helpers do
  def check_playing player
    if player.playing
      "playing"
    else
      "not_playing"
    end
  end
end
