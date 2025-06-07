source "https://rubygems.org"

# Use the GitHub Pages gem which includes Jekyll and other dependencies
gem "github-pages", group: :jekyll_plugins

# Only add gems that are whitelisted by GitHub Pages
group :jekyll_plugins do
  gem "jekyll-feed"
end

# Windows and JRuby platforms
platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem "tzinfo", ">= 1", "< 3"
  gem "tzinfo-data"
end

# Performance-booster for watching directories on Windows
gem "wdm", "~> 0.1", :platforms => [:mingw, :x64_mingw, :mswin]

gem "http_parser.rb", "~> 0.6.0", :platforms => [:jruby]