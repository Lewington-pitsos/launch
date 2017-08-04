require 'redcarpet'
require "yaml"

FILE_TREATMENT = {
  ".md" => "text/html;charset=utf-8",
  ".txt" => "text/plain",
  ".yaml" => "text/plain"
}.freeze

MARKDOWN = Redcarpet::Markdown.new(Redcarpet::Render::HTML)
MARKDOWN_HTML = "<!DOCTYPE html><html><head><link rel='stylesheet' href='/style/markdown.css'></head><body>"
MARKDOWN_HTML_END = "</body></html>"

def identify_suffix filename
    name = filename.match(/\.[^\.]+$/)
    return name[0] if name
end

def render_file_type file, suffix
  if suffix == ".txt"
    file
  elsif suffix == ".md"
    MARKDOWN_HTML + MARKDOWN.render(file) + MARKDOWN_HTML_END
  elsif suffix == ".yaml"
      file
  else
    "ERROR"
  end
end


def new_file_invalidate name
  if name.length < 1
    "Please include some characters"
  elsif !identify_suffix name
    "Please include a suffix"
  end
end

def logged_in_checkpoint status
  unless status
    session[:error] = "You must be signed in to do that"
    redirect "/index"
  end
end

def check_admin username, path
  unless username == "admin"
    session[:error] = "You must be an Administrator to do that"
    redirect path
  end
end
