require "sinatra"
require "sinatra/reloader"
require "tilt/erubis"
require_relative "logic/player"
require_relative "logic/sorters"
require_relative "logic/file_logic"

INVALID_SCORE_MESSAGE = "That score was invalid."
INVALID_NAME_MESSAGE = "That name was invalid."
EXTANT_NAME_MESSAGE = "That name already exists, please use a new one"
WELCOME_MESSAGE = "Welcome to SimpleChess"

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
=begin
essentially the session is responsible for keeping track of:
  :list => all of the players/player objects in the tourniment
  :current_no => the current round number
  :success/:error => success and error messages
  :current_name => the name of the current tourniment

  :round => during roudns only, a more interactve version of the player-list that allows the user to simulate game wins, losses and draws.
=end
# -------------------------------- MISC routing ---------------------------- #

configure do
  enable :sessions
  set :session_secret, "secret"
  use Rack::Session::Cookie, key: 'rack.session',
                             path: '/',
                             secret: 'secret'
end

# I wanted to display a welcome message to anyone booting up the app, perhaps there is a more efficient way of doing this.
get '/start' do
  session[:success] = WELCOME_MESSAGE

  redirect '/load'
end

# ------------------------ ADDING/DELETING players ------------------------ #

# returns score converted to the nearest half Other values are illigal.
def convert_score score
  (score * 2).round / 2.0
end

def check_score score
  # empty strings get converted to 0
  unless score.to_f.to_s == score || score.to_i.to_s == score || score == ""
    INVALID_SCORE_MESSAGE
  end
end

def check_player name
  players = session[:list].map(&:name)
  check name, players
end

get "/new_player" do
  # loads a new player editing page
  erb :new_player
end

post "/new_player" do
  # both the score and the player name input are validated before a new player is added to the session
  if session[:error] = check_player(params[:name].strip)
    redirect "new_player"
  end

  if session[:error] = check_score(params[:score])
    redirect "/new_player"
  end

  converted_score = convert_score params[:score].to_f
  #all players are stored in session[:list]
  session[:list] << Player.new(name: params[:name], score: converted_score)

  session[:success] = "#{params[:name]} added to tourniment"

  redirect "/new_player"
end

get "/players" do
  # loads a ranked list of players and some saving/loading options
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
  # loads a player editing page.
  @player_name = params[:name]
  @score = params[:score]

  erb :edit_player
end

post "/edit_player/:old_name/:old_score" do
  # edits the details of a given player. The old values are needed in case the new ones don't pass validation.
  if params[:old_name] != params[:name]
    # part of the check_player validation ensures that the player's name is not already in session[:list] so running this on the player's old name would fail in a way we don't want. Also, if the new name is the old one it has already passed validation.
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
  # Each new round requires a re-sorting of all players who are participating in that round, so can;t rely on the sorting of ALL players that we already had at '/players'. Once the round is created from this sorting there is no need to store it independently.
  @round = Round.new(list.pair, session[:round_no])
  session[:round] = @round

  erb :round
end

get "/round" do
  @round = session[:round]

  erb :round
end

# the rest of these routs are just ways of interacting with the Round object.

post "/win/:name" do
  session[:round].win params[:name]

  redirect "/round"
end

post "/undo_win/:name" do
  session[:round].undo_win params[:name]

  redirect "/round"
end

# automatically draws all players who have not either won or lost which saves the user having to draw manually.
post "/finish" do
  session[:round].finish_round
  session[:round_no] = session[:round].number
  autosave

  redirect "/players"
end

# --------------------- DELETING/SAVING/LOADING Files ------------------------ #

post "/tourniment/new" do
  # writes a new, empty yaml file (at round 0) and then instantly loads it.
  write_yaml [session[:list], 0], "#{data_path}#{session[:current_name]}.yaml"
  create_file params[:filename]

  load_file params[:filename] + ".yaml"
  session[:success] = "New Tourniment Created: #{params[:filename]}"
  redirect "/players"
end

post "/autosave" do
  # writes the current session state to .yaml, no validation is needed.
  autosave
  session[:success] = "#{session[:current_name]} Successfully Saved"
  redirect "/players"
end

def autosave
  write_yaml [session[:list], session[:round_no]],
             "#{data_path}#{session[:current_name]}.yaml"
end

def check_file name
  # validation for file names, no two should be the same, and none should contain only punctuation
  files = Dir.glob("#{data_path}*").map { |file| File.basename(file, ".yaml") }
  check name, files
end

def create_file input, state = [[], 0]
  # The 0 represents the current round number, which it seemed appripriate to store in each file. The empty array will eventually store a list of players.
  name = input.strip

  if session[:error] = check_file(name)
    redirect '/players' unless params[:source] == 'load'
    # New files can be created from two different routs. When an error occurs it is important that the user get redirected to the correct rout.
    redirect '/load'
  end
  write_yaml state, "#{data_path}#{name + '.yaml'}"
end

post "/save" do
  # saves the current tournament file to a .yaml file
  create_file params[:filename], [session[:list], session[:round_no]]
  session[:success] = "File Written"
  redirect "/players"
end

get "/load" do
  # A page displaying a list of all existing tourniment files
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
  # loads a new tournament file
  load_file params[:filename] + '.yaml'

  session[:success] = "#{params[:filename]} successfully loaded"

  redirect "/players"
end

post "/delete/:filename" do
  require "fileutils"
  session[:current_name] = nil; # See the last lines of file_list.erb
  FileUtils.rm "#{data_path}#{params[:filename]}.yaml"

  redirect "/load"
end

# ----------------------------------- TOGGLE --------------------------------- #

post "/toggle/:name" do
  # the actual player object is altered to prevent it being added to the next round.
  session[:list].each do |player|
    player.toggle if player.name == params[:name]
  end

  redirect "/players"
end

get '/toggle_all' do
  # it seemed important to be able to add all players to the round in a single click in case, for instance, the user wanted to quickly see the rankings without the ordering being effected by who was in the round. Removing all players from the round at once seemed less useful.
  session[:list].each do |player|
    player.toggle unless player.playing
  end

  redirect "/players"
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
    # important becuase all un-finished pairs are drawn at the end of each round.
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
  # validates player names or file names given a name and a list of players or files and displays an appropriate message
  if name == "" || name == ".yaml" || name.match(/[^\w]/)
    INVALID_NAME_MESSAGE
  elsif list.include?(name)
    EXTANT_NAME_MESSAGE
  end
end
