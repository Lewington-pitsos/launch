require "minitest/autorun"
require "rack/test"
require_relative "../main.rb"

ENV["RACK_ENV"] = "test"

class RoutTesting < Minitest::Test
  include Rack::Test::Methods

  def app
    Sinatra::Application
  end

  def session
    last_request.env["rack.session"]
  end

  def setup
    post "/load/example.yaml"
  end

  def test_player_list
    get "/players"
    assert_equal 200, last_response.status
    assert_equal "text/html;charset=utf-8", last_response["Content-Type"]
    assert_includes last_response.body, "Ladder"
    assert_includes last_response.body, "harry"
    assert_includes last_response.body, "New Round"
  end

  def test_new_round
    get "/new_round"
    assert_equal 200, last_response.status
    assert_equal "text/html;charset=utf-8", last_response["Content-Type"]
    assert_includes last_response.body, "Finish Round"
    assert_includes last_response.body, "harry"
  end

  def test_round_win_redirect
    get "/new_round"
    post "/win/sarah"
    assert_equal 302, last_response.status
  end

  def test_round_undo_win_redirect
    get "/new_round"
    post "/win/sarah"

    get last_response["Location"]

    post"/undo_win/sarah"
    assert_equal 302, last_response.status
  end

  def test_round_finish
    get "/new_round"
    post "/finish"
    assert_equal 302, last_response.status

    get last_response["Location"]
    assert_equal 200, last_response.status
    assert_includes last_response.body, "Ladder"
    assert_includes last_response.body, "New Round"
  end

  def test_load_screen
    get "/load"
    assert_equal 200, last_response.status
    assert_includes last_response.body, "<h3>Tourniment Files: </h3>"
  end

  def test_player_added
    post "/new_player", name: "Xavier", score: "3"
    assert_equal 302, last_response.status

    get last_response["Location"]
    assert_equal 200, last_response.status
    assert_includes last_response.body, "Xavier"
    assert_includes last_response.body, "3"
  end

  def test_toggle_out_player
    post "/toggle/harry"
    assert_equal 302, last_response.status

    get last_response["Location"]
    assert_equal 200, last_response.status
    assert_includes last_response.body, "class=\"not_playing\""

    get "/new_round"
    assert_equal 200, last_response.status
    refute_includes last_response.body, "harry"
  end

end
