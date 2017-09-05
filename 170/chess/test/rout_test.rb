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
    post "/load/example"
    post "/save", filename: "test_file"
    post "/load/test_file"
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
    assert_includes last_response.body, "Tournament Files:"
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
    assert_includes last_response.body, INVALID_NAME_MESSAGE
  end

  def test_player_add_used_name
    post "/new_player", name: "sam", score: "3"
    assert_equal 302, last_response.status

    get last_response["Location"]
    assert_equal 200, last_response.status
    assert_includes last_response.body, EXTANT_NAME_MESSAGE
  end

  def test_add_weird_score_inputs
    post "/new_player", name: "Igor", score: ""
    assert_equal 302, last_response.status

    get "/players"
    assert_equal 200, last_response.status
    assert_match(/Igor:.*0.0/, last_response.body)

    post "/new_player", name: "Beatrix", score: "423f"
    assert_equal 302, last_response.status

    get last_response["Location"]
    assert_equal 200, last_response.status
    assert_includes last_response.body, INVALID_SCORE_MESSAGE

    post "/new_player", name: "Lestrade", score: "0.13"
    assert_equal 302, last_response.status

    get "/players"
    assert_equal 200, last_response.status
    assert_match(/Lestrade:.*0.0/, last_response.body)
  end

  def test_delete_player
    post "/delete_player/sam"
    assert_equal 302, last_response.status

    get last_response["Location"]
    assert_equal 200, last_response.status
    refute_includes last_response.body, "sam"
  end

  def test_edit_player_rout
    get "/edit_player/sam/0.0"
    assert_equal 200, last_response.status
    assert_includes last_response.body, "sam"
    assert_includes last_response.body, "0.0"
  end

  def test_edit_player_works
    post "/edit_player/sam/0.0", name: "Igor", score: "3"
    assert_equal 302, last_response.status

    get last_response["Location"]
    assert_equal 200, last_response.status
    assert_match(/Igor:.*3.0/, last_response.body)
    refute_includes last_response.body, "sam"
  end

  def test_edit_keeping_same_name
    post "/edit_player/sam/0.0", name: "sam", score: "3"
    assert_equal 302, last_response.status

    get last_response["Location"]
    assert_equal 200, last_response.status
    assert_match(/sam:.*3.0/, last_response.body)
  end

  def test_edit_weird_score_inputs
    post "/edit_player/sam/0.0", name: "sam", score: ""
    assert_equal 302, last_response.status

    get last_response["Location"]
    assert_equal 200, last_response.status
    assert_match(/sam:.*0.0/, last_response.body)

    post "/edit_player/sam/0.0", name: "sam", score: "423f"
    assert_equal 302, last_response.status

    get last_response["Location"]
    assert_equal 200, last_response.status
    assert_includes last_response.body, INVALID_SCORE_MESSAGE

    post "/edit_player/sam/0.0", name: "sam", score: "0.13"
    assert_equal 302, last_response.status

    get last_response["Location"]
    assert_equal 200, last_response.status
    assert_match(/sam:.*0.0/, last_response.body)
  end

  def test_edit_blocks_bad_names
    post "/edit_player/sam/0.0", name: "  %%:", score: "3"
    get last_response["Location"]
    assert_equal 200, last_response.status
    assert_includes last_response.body, INVALID_NAME_MESSAGE

    post "/edit_player/sam/0.0", name: "  ", score: "3"
    get last_response["Location"]
    assert_equal 200, last_response.status
    assert_includes last_response.body, INVALID_NAME_MESSAGE

    post "/edit_player/sam/0.0", name: "", score: "3"
    get last_response["Location"]
    assert_equal 200, last_response.status
    assert_includes last_response.body, INVALID_NAME_MESSAGE

    post "/edit_player/sam/0.0", name: "-", score: "3"
    get last_response["Location"]
    assert_equal 200, last_response.status
    assert_includes last_response.body, INVALID_NAME_MESSAGE
  end

  def test_edit_blocks_taken_names
    post "/edit_player/sam/0.0", name: "bill", score: "3"
    get last_response["Location"]
    assert_equal 200, last_response.status
    assert_includes last_response.body, EXTANT_NAME_MESSAGE
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
    assert_includes last_response.body, EXTANT_NAME_MESSAGE
  end

  def test_save_as_blank_name
    post "/save", filename: "   "
    assert_equal 302, last_response.status

    get last_response["Location"]
    assert_equal 200, last_response.status
    assert_includes last_response.body, INVALID_NAME_MESSAGE
  end

  def test_save_and_reload
    post "/new_player", name: "Xavier", score: "3"
    assert_equal 302, last_response.status

    post "/autosave"
    assert_equal 302, last_response.status

    post "/load/test_file"
    assert_equal 302, last_response.status

    get last_response["Location"]
    assert_equal 200, last_response.status
    assert_includes last_response.body, "Xavier"
    assert_includes last_response.body, "3"
  end

  def test_delete_file
    post "/delete/test_file"
    assert_equal 302, last_response.status

    get last_response["Location"]
    assert_equal 200, last_response.status
    refute_includes last_response.body, "test_file"
  end

  def test_new_tourniment_fail_from_load_screen
    get '/load'
    assert_equal 200, last_response.status

    post "/tourniment/new", source: 'load', filename: ''
    assert_equal 302, last_response.status

    get last_response["Location"]
    assert_equal 200, last_response.status
    assert_includes last_response.body, INVALID_NAME_MESSAGE
    assert_includes last_response.body, 'class="file-list"'
  end

  # -------------------------- POINTS and TOGGLE ---------------------- #

  def test_toggle_out_player
    post "/toggle/harry"
    assert_equal 302, last_response.status

    get last_response["Location"]
    assert_equal 200, last_response.status
    assert_includes last_response.body, "not_playing"

    get "/new_round"
    assert_equal 200, last_response.status
    refute_includes last_response.body, "harry"
  end

  def test_add_permenent_points
    get "/new_round"
    assert_equal 200, last_response.status
    assert_includes last_response.body, "harry:"
    assert_includes last_response.body, "1.0"

    post "/win/harry"
    assert_equal 302, last_response.status

    get last_response["Location"]
    assert_equal 200, last_response.status
    assert_includes last_response.body, "harry:"
    assert_includes last_response.body, " 2.0"

    post "/finish"
    assert_equal 302, last_response.status

    get last_response["Location"]
    assert_equal 200, last_response.status
    assert_includes last_response.body, "harry:"
    assert_includes last_response.body, "2.0"
    assert_includes last_response.body, "bob:"
    assert_includes last_response.body, "0.5"
  end

  def test_undo_win
    get "/new_round"
    assert_equal 200, last_response.status
    assert_includes last_response.body, "harry:"
    assert_includes last_response.body, "1.0"

    post "/win/harry"
    assert_equal 302, last_response.status

    get last_response["Location"]
    assert_equal 200, last_response.status
    assert_includes last_response.body, "harry:"
    assert_includes last_response.body, " 2.0"


    post "/undo_win/harry"
    assert_equal 302, last_response.status

    get last_response["Location"]
    assert_equal 200, last_response.status
    assert_includes last_response.body, "harry:"
    assert_includes last_response.body, "1.0"
  end

  # -------------------------- ROUND NUMBER ---------------------- #

  def test_round_increments
    get "/players"
    assert_equal 200, last_response.status
    assert_match(/Round[\s.]*0/, last_response.body)

    get "/new_round"
    assert_equal 200, last_response.status
    assert_match(/Round[\s.]*1/, last_response.body)

    post "/finish"
    assert_equal 302, last_response.status

    get last_response["Location"]
    assert_equal 200, last_response.status
    assert_match(/Round[\s.]*1/, last_response.body)
  end
end
