require "sinatra"
require "sinatra/reloader"
require "tilt/erubis"
require_relative "logic/player"
require_relative "logic/sorters"
require_relative "logic/file_logic"

INVALID_SCORE_MESSAGE = "That score was invalid."
INVALID_NAME_MESSAGE = "That name was invalid."
EXTANT_NAME_MESSAGE = "That name already exists, please use a new one"

also_reload '/public/style/main.css'
also_reload 'logic/player.rb'
also_reload 'logic/sorters.rb'
configure do
  enable :sessions
  set :session_secret, "secret"
  use Rack::Session::Cookie, key: 'rack.session',
                             path: '/',
                             secret: 'secret'
end

not_found do
  redirect "/load"
end

# ------------------------ ADDING/DELETING players ------------------------ #

def convert_score score
  (score * 2).round / 2.0
end

def check_score score
  unless score.to_f.to_s == score || score.to_i.to_s == score || score == ""
    INVALID_SCORE_MESSAGE
  end
end

def check_player name
  players = session[:list].map(&:name)
  check name, players
end

get "/new_player" do
  erb :new_player
end

post "/new_player" do
  if session[:error] = check_player(params[:name].strip)
    redirect "new_player"
  end

  if session[:error] = check_score(params[:score])
    redirect "/new_player"
  end

  converted_score = convert_score params[:score].to_f
  session[:list] << Player.new(name: params[:name], score: converted_score)

  session[:success] = "#{params[:name]} added to tourniment"

  redirect "/new_player"
end

get "/players" do
  @player_list = Sorter.new(session[:list]).players
  erb :player_list
end

post "/delete_player/:name" do
  session[:list].each do |player|
    session[:list].delete(player) if player.name == params[:name]
  end

  redirect "/players"
end

get "/edit_player/:name/:score" do
  @player_name = params[:name]
  @score = params[:score]

  erb :edit_player
end

post "/edit_player/:old_name/:old_score" do
  if params[:old_name] != params[:name]
    if session[:error] = check_player(params[:name].strip)
      redirect "/edit_player/#{params[:old_name]}/#{params[:old_score]}"
    end
  end

  if session[:error] = check_score(params[:score])
    redirect "/edit_player/#{params[:old_name]}/#{params[:old_score]}"
  end
  to_edit = session[:list].select do |player|
    player.name == params[:old_name]
  end[0]

  to_edit.score = convert_score params[:score].to_f
  to_edit.name = params[:name]

  session[:success] = "Details Updated for: #{params[:name]}"

  redirect "/players"
end

# --------------------------- ROUND RELATED ----------------------------- #

get "/new_round" do
  playing = session[:list].select(&:playing)
  list = Sorter.new(playing)
  @round = Round.new(list.pair, session[:round_no])
  session[:round] = @round

  erb :round
end

get "/round" do
  @round = session[:round]

  erb :round
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
  session[:round_no] = session[:round].number
  autosave

  redirect "/players"
end

# --------------------- DELETING/SAVING/LOADING Files ------------------------ #

post "/tourniment/new" do
  write_yaml [session[:list], 0], "#{data_path}#{session[:current_name]}.yaml"
  create_file params[:filename]

  load_file params[:filename] + ".yaml"
  session[:success] = "New Tourniment Created: #{params[:filename]}"
  redirect "/players"
end

post "/autosave" do
  autosave
  session[:success] = "#{session[:current_name]} Successfully Saved"
  redirect "/players"
end

def autosave
  write_yaml [session[:list], session[:round_no]],
             "#{data_path}#{session[:current_name]}.yaml"
end

def check_file name
  files = Dir.glob("#{data_path}*").map { |file| File.basename(file, ".yaml") }
  check name, files
end

def create_file input, state = [[], 0]
  name = input.strip

  if session[:error] = check_file(name)
    redirect '/players' unless params[:source] == 'load'
    redirect '/load'
  end
  write_yaml state, "#{data_path}#{name + '.yaml'}"
end

post "/save" do
  create_file params[:filename], [session[:list], session[:round_no]]
  session[:success] = "File Written"
  redirect "/players"
end

get "/load" do
  @files = Dir.glob("#{data_path}*").map { |file| File.basename(file, '.yaml') }
  erb :file_list
end

def load_file name
  file = (read_yaml "#{data_path}#{name}")
  session[:list] = file[0]
  session[:round_no] = file[1]
  session[:current_name] = name.gsub(/.yaml/, '')
end

post "/load/:filename" do
  load_file params[:filename] + '.yaml'

  session[:success] = "#{params[:filename]} successfully loaded"

  redirect "/players"
end

post "/delete/:filename" do
  require "fileutils"
  session[:current_name] = nil;
  FileUtils.rm "#{data_path}#{params[:filename]}.yaml"

  redirect "/load"
end

# ----------------------------------- MISC --------------------------------- #

post "/toggle/:name" do
  session[:list].each do |player|
    player.toggle if player.name == params[:name]
  end

  redirect "players"
end

# ----------------------------- MISC METHODS ------------------------------ #

helpers do
  def check_playing player
    if player.playing
      "playing"
    else
      "not_playing"
    end
  end

  def check_finished pair
    if pair.winner
      "/undo_win/"
    else
      "/win/"
    end
  end

  def is_winner name, pair
    if name == pair.winner
      "winner"
    else
      ""
    end
  end
end

def check name, list
  if name == "" || name == ".yaml" || name.match(/[^\w]/)
    INVALID_NAME_MESSAGE
  elsif list.include?(name)
    EXTANT_NAME_MESSAGE
  end
end
