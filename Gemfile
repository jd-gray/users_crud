source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '2.7.1'

gem 'rails', '~> 6.0.3', '>= 6.0.3.3'
gem 'pg', '>= 0.18', '< 2.0'
gem 'puma', '~> 4.1'
gem 'sass-rails', '>= 6'
gem 'webpacker', '~> 4.0'
gem 'turbolinks', '~> 5'
gem 'jbuilder', '~> 2.7'
gem 'bootsnap', '>= 1.4.2', require: false
gem 'faker', '~> 1.6', '>= 1.6.3'
gem 'activerecord-import', '~> 1.0', '>= 1.0.7'
gem 'will_paginate', '~> 3.3'
gem 'pg_search', '~> 2.3', '>= 2.3.4'

group :development, :test do
  gem 'rspec-rails', '~> 4.0', '>= 4.0.1'
  gem 'guard', '~> 2.16', '>= 2.16.2'
  gem 'guard-rspec', '~> 4.7', '>= 4.7.3'
  gem 'byebug', platforms: [:mri, :mingw, :x64_mingw]
end

group :development do
  gem 'web-console', '>= 3.3.0'
  gem 'listen', '~> 3.2'
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
