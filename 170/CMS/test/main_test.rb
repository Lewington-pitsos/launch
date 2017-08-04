ENV["RACK_ENV"] = "test" # tells sinatra that this ia s test file and should
                         # not be used to start a web server
require "minitest/autorun"
require "rack/test"
require "fileutils"

require_relative "../main.rb"


class AppTest < Minitest::Test
  include Rack::Test::Methods

  def create_document(name, content = "")
    File.open(File.join(data_path, name), "w") do |file|
      file.write(content)
    end
  end

  def session
    last_request.env["rack.session"]
  end

  def admin_session
    { "rack.session" => { username: "admin" } }
  end

  # ------------------------ END OF HELPERS -------------------------- #

  def setup
    FileUtils.mkdir_p(data_path)
    create_document "about.md", File.read("data/about.md")
    create_document "changes.txt", "woop woop"
    create_document "history.txt", File.read("data/history.txt")
    create_document "config.yaml", File.read("data/config.yaml")
    post "/validate", username: "bill", password: "bills"
  end

  def teardown
    FileUtils.rm_rf(data_path)
  end

  def app
    Sinatra::Application
  end

  def test_index
    get "/index", logged_in: true
    assert_equal 200, last_response.status
    assert_equal "text/html;charset=utf-8", last_response.headers["Content-Type"]
    assert_includes last_response.body, "history.txt"
    assert_includes last_response.body, "about.md"
    assert_includes last_response.body, "changes.txt"
    assert_includes last_response.body, "href=\"/file/changes.txt\""
    refute_includes last_response.body, "idontexist.txt does not exist."

  end

  def test_changes_file
    get "/file/changes.txt"
    assert_equal 200, last_response.status
    assert_equal "text/plain", last_response["Content-Type"]
    assert_includes last_response.body, "woop"
  end

  def test_non_existant_page
    get "/file/idontexist.txt"
    assert_equal 302, last_response.status

    get last_response["Location"]
    assert_equal 200, last_response.status
    assert_equal "text/html;charset=utf-8", last_response["Content-Type"]
    assert_includes last_response.body, "idontexist.txt does not exist."
  end

  def test_md_file
    get "/file/about.md"
    assert_equal 200, last_response.status
    assert_equal "text/html;charset=utf-8", last_response["Content-Type"]
    assert_includes last_response.body, "<h1>"
    assert_includes last_response.body, "</h1>"
    assert_includes last_response.body, "<p>"
    assert_includes last_response.body, "</p>"
  end

  def test_edit_exists
    get "/file/history.txt/edit"
    assert_equal 200, last_response.status
    assert_equal "text/html;charset=utf-8", last_response["Content-Type"]
    assert_includes last_response.body, "<form action=\"/file/history.txt/edit\" method=\"post\">"
  end

  def test_editing_process
    post "/file/changes.txt/edit", file_content: "new content"
    assert_equal 302, last_response.status

    get last_response["Location"]
    assert_includes last_response.body, "changes.txt has been updated"

    get "/file/changes.txt"
    assert_equal 200, last_response.status
    assert_includes last_response.body, "new content"
  end

  def test_new_file_exists
    get "/new"
    assert_equal 200, last_response.status
    assert_equal "text/html;charset=utf-8", last_response["Content-Type"]
    assert_includes last_response.body, "<form action=\"/new\" method=\"post\">"
  end

  def test_new_file_updates
    post "/new", file_name: "newfile.txt"
    assert_equal 302, last_response.status

    get last_response["Location"]
    assert_includes last_response.body, "newfile.txt was created."
    assert_includes last_response.body, "<div class=\"general\">newfile.txt</div>"
  end

  def test_new_file_validation_suffix
    post "/new", file_name: "newfile"
    assert_equal 302, last_response.status

    get last_response["Location"]
    assert_includes last_response.body, "Please include a suffix"
  end

  def test_new_file_validation_chars
    post "/new", file_name: "   "
    assert_equal 302, last_response.status

    get last_response["Location"]
    assert_includes last_response.body, "Please include some characters"
  end

  def test_file_delete
    post "/new", file_name: "tempfile.md"
    post "/file/tempfile.md/delete"
    assert_equal 302, last_response.status

    get last_response["Location"]
    assert_includes last_response.body, "tempfile.md was deleted."
    refute_includes last_response.body, "<div class=\"general\">tempfile.md</div>"
  end

  def test_unlogged_user
    get "/index", {}, { "rack.session" => { logged_in: false } }
    assert_equal 200, last_response.status


    assert_includes last_response.body, "Sign In"
    refute_includes last_response.body, "Sign Out"
  end

  def test_correct_credentials
    post "/validate",
    {username: "admin", password: "secret"},
    {"rack.session" => { logged_in: false } }

    assert_equal 302, last_response.status

    get last_response["Location"]
    assert_includes last_response.body, "Welcome!"
  end

  def test_sign_out_possible
    get "/index"
    assert_equal 200, last_response.status
    refute_includes last_response.body, "Sign In"
    assert_includes last_response.body, "Sign Out"
  end

  def test_bad_credentials
    post "/validate",
    {username: "russia", password: "china"},
    {"rack.session" => { logged_in: false } }

    assert_equal 200, last_response.status
    assert_includes last_response.body, "Invalid Credentials"
    assert_includes last_response.body, "russia"
    assert_includes last_response.body, "china"
  end

  def test_sign_out
    post "/sign_out"
    assert_equal 302, last_response.status


    get last_response["Location"]
    assert_equal 200, last_response.status
    assert_includes last_response.body, "You have been signed out"
  end

  def test_invalid_actions

    get "/file/about.md/edit", {},{"rack.session" => { logged_in: false } }
    assert_equal 302, last_response.status
    get last_response["Location"]
    assert_includes last_response.body, "You must be signed in to do that"

    get "/new"
    assert_equal 302, last_response.status
    get last_response["Location"]
    assert_includes last_response.body, "You must be signed in to do that"

    post "/file/about.md/edit"
    get last_response["Location"]
    assert_includes last_response.body, "You must be signed in to do that"

    post "/file/changes.txt/delete"
    get last_response["Location"]
    assert_includes last_response.body, "You must be signed in to do that"

    post "/new"
    get last_response["Location"]
    assert_includes last_response.body, "You must be signed in to do that"

  end

  def test_not_all_users_can_edit_users
    post "/file/config.yaml/edit"
    get last_response["Location"]
    assert_includes last_response.body, "You must be an Administrator to do that"

    post "/file/config.yaml/delete"
    get last_response["Location"]
    assert_includes last_response.body, "You must be an Administrator to do that"
    assert_includes last_response.body, "config.yaml"

  end

end
