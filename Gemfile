source "https://rubygems.org"

# Jekyll
gem "jekyll", "~> 4.3.0"

# Security updates
gem "nokogiri", "~> 1.18.9"
gem "rexml", "~> 3.4.2"

# Plugins
group :jekyll_plugins do
  gem "jekyll-feed", "~> 0.12"
  gem "jekyll-seo-tag"
  gem "jekyll-sitemap"
end

# Required for Ruby 3+
gem "webrick", "~> 1.7"

# Windows and JRuby
platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem "tzinfo", ">= 1", "< 3"
  gem "tzinfo-data"
end

platforms :mingw, :x64_mingw, :mswin do
  gem "wdm", "~> 0.1.1"
end