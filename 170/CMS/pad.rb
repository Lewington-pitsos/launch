require 'redcarpet'

MARKDOWN = Redcarpet::Markdown.new(Redcarpet::Render::HTML)

p "<!DOCTYPE html><html><head><link rel='stylesheet' href='/style/markdown.css'></head>" + MARKDOWN.render("# Ruby is...



A dynamic, open source programming language with a focus on simplicity and productivity. It has an elegant syntax that is natural to read and easy to write

")
