require "sinatra"
require "sinatra/reloader"
require "tilt/erubis"
require_relative "logic/player"
require_relative "logic/sorters"

configure do
  enable :sessions
  set :session_secret, "secret"
  use Rack::Session::Cookie, key: 'rack.session',
                         path: '/',
                         secret: 'secret'
end



before do

end


get "/players" do
  session[:list] = [@bob = Player.new({name: "bob"}),
  @sam = Player.new({name: "sam"}),
  @harry = Player.new({name: "harry", score: 1}),
  @daniel = Player.new({name: "daniel", score: 0, tiebreak: 0.5}),
  @sarah = Player.new({name: "sarah", score: 0, tiebreak: 1}),
  @bill = Player.new({name: "bill", score: 0, tiebreak: 99})]

  @player_list = session[:list]
  erb :player_list
end

get "/new_round" do
  list = Sorter.new(session[:list])
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
