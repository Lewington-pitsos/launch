require 'sinatra'
require 'sinatra/reloader'
require 'tilt/erubis'


also_reload '/public/style/main.css'

configure do
  enable :sessions
  set :session_secret, "secret"
  use Rack::Session::Cookie, key: 'rack.session',
                             path: '/',
                             secret: 'secret'
end


not_found do
  @apples = "killer"
  erb :index
end
