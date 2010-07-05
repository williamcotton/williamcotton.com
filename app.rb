#! /usr/bin/env ruby
require 'rubygems'
require 'json'
require 'sinatra'

set :app_file, __FILE__
set :static, true
set :logging, true

get '/' do
  erb :index
end

get '/pagerank' do
  erb :pagerank
end