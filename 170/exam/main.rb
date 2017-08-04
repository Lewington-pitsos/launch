require "sinatra"
require "sinatra/reloader"
require "tilt/erubis"

configure do
  enable :sessions
  set :session_secret, "secret"
  use Rack::Session::Cookie, key: 'rack.session',
                         path: '/',
                         secret: 'secret'
end

get "/" do
  [:first_name, :last_name, :ccv, :date, :num].each do |i|
    session.delete(i)
  end
  redirect "payments/create"
end

get "/payment" do
  @time = Time.new
  erb :payment
end


get "/payments/create" do
  erb :details
end


post "/payments/create" do
  not_entered = []

  params.each do |k, v|
    if v == ""
       not_entered << k
    else
      session[k] = v
    end
  end


  if session[:num] && session[:num].length != 16
    session[:error] = "invalid credit card: #{session[:num]}"
    session[:error_2] = "the following were not entered: #{not_entered.join(", ")}"
    # was I supposed to insert error 2 in this case as well? I wasn't sure...
    redirect "/payments/create"
  end

  if not_entered.empty?
    session[:success] = "Thank you for your payment."
    redirect '/payment'
  end

  session[:error_2] = "the following were not entered: #{not_entered.join(", ")}"

  redirect "/payments/create"
end
