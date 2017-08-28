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
    post "/save", filename: "test_file"
    post "/load/test_file.yaml"
    get "/load"
  end

  def teardown
    require 'fileutils'
    files = Dir.glob("#{data_path}*")
    files.each do |file|
      FileUtils.rm file unless file == "#{data_path}example.yaml"
    end
  end

  # -------------------------- BASIC ROUTING ---------------------- #

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

  def test_load_screen
    get "/load"
    assert_equal 200, last_response.status
    assert_includes last_response.body, "<h3>Tourniment Files: </h3>"
  end

  # -------------------------- ADDING/DELETING Players ---------------------- #

  def test_player_added
    post "/new_player", name: "Xavier", score: "3"
    assert_equal 302, last_response.status

    get last_response["Location"]
    assert_equal 200, last_response.status
    assert_includes last_response.body, "Xavier"
    assert_includes last_response.body, "3"
  end

  def test_player_add_bad_name
    post "/new_player", name: "", score: "3"
    assert_equal 302, last_response.status

    get last_response["Location"]
    assert_equal 200, last_response.status
    assert_includes last_response.body, "That name was invalid."
  end

  def test_player_add_used_name
    post "/new_player", name: "sam", score: "3"
    assert_equal 302, last_response.status

    get last_response["Location"]
    assert_equal 200, last_response.status
    assert_includes last_response.body, "That name already exists, please use a new one"
  end

  def test_delete_player
    post "/delete_player/sam"
    assert_equal 302, last_response.status

    get last_response["Location"]
    assert_equal 200, last_response.status
    refute_includes last_response.body, "sam"
  end

  # -------------------------- SAVING/LOADING ---------------------- #

  def test_auto_save
    post "/autosave"
    assert_equal 302, last_response.status

    get "/load"
    assert_equal 200, last_response.status
    #should only be two list items
    assert_match(/^(?!.*<li>.*<li>.*<li>).*$/, last_response.body)
  end

  def test_save_as
    post "/save", filename: "new_file"
    assert_equal 302, last_response.status

    get "/load"
    assert_equal 200, last_response.status
    assert_includes last_response.body, "new_file"
  end

  def test_save_as_same_file
    post "/save", filename: "example"
    assert_equal 302, last_response.status

    get last_response["Location"]
    assert_equal 200, last_response.status
    assert_includes last_response.body, "That name already exists, please use a new one"
  end

  def test_save_as_blank_name
    post "/save", filename: "   "
    assert_equal 302, last_response.status

    get last_response["Location"]
    assert_equal 200, last_response.status
    assert_includes last_response.body, "That name was invalid."
  end

  def test_save_and_reload
    post "/new_player", name: "Xavier", score: "3"
    assert_equal 302, last_response.status

    post "/autosave"
    assert_equal 302, last_response.status

    post "/load/test_file.yaml"
    assert_equal 302, last_response.status

    get last_response["Location"]
    assert_equal 200, last_response.status
    assert_includes last_response.body, "Xavier"
    assert_includes last_response.body, "3"
  end

  def test_delete_file
    post "/delete/test_file.yaml"
    assert_equal 302, last_response.status

    get last_response["Location"]
    assert_equal 200, last_response.status
    refute_includes last_response.body, "test_file"
  end

  # -------------------------- POINTS and TOGGLE ---------------------- #

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

  def test_add_permenent_points
    get "/new_round"
    assert_equal 200, last_response.status
    assert_includes last_response.body, "harry: 1.0"

    post "/win/harry"
    assert_equal 302, last_response.status

    get last_response["Location"]
    assert_equal 200, last_response.status
    assert_includes last_response.body, "harry: 2.0"

    post "/finish"
    assert_equal 302, last_response.status

    get last_response["Location"]
    assert_equal 200, last_response.status
    assert_includes last_response.body, "harry: 2.0"
    assert_includes last_response.body, "bob: 0.5"
    assert_includes last_response.body, "sam: 0.5"
  end

  def test_undo_win
    get "/new_round"
    assert_equal 200, last_response.status
    assert_includes last_response.body, "harry: 1.0"

    post "/win/harry"
    assert_equal 302, last_response.status

    get last_response["Location"]
    assert_equal 200, last_response.status
    assert_includes last_response.body, "harry: 2.0"

    post "/undo_win/harry"
    assert_equal 302, last_response.status

    get last_response["Location"]
    assert_equal 200, last_response.status
    assert_includes last_response.body, "harry: 1.0"
  end

  # -------------------------- ROUND NUMBER ---------------------- #

  def test_round_increments
    get "/players"
    assert_equal 200, last_response.status
    assert_includes last_response.body, "Round 0"

    get "/new_round"
    assert_equal 200, last_response.status
    assert_includes last_response.body, "Round 1"

    post "/finish"
    assert_equal 302, last_response.status

    get last_response["Location"]
    assert_equal 200, last_response.status
    assert_includes last_response.body, "Round 1"
  end
end
