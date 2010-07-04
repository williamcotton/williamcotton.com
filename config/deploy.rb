##########################################################
# Application
#############################################################

set :domain, "williamcotton"
server domain, :app, :web
role :db, domain, :primary => true
set :deploy_to, "/data/williamcotton"

#############################################################
# Settings
#############################################################
  
 default_run_options[:pty] = true
 ssh_options[:forward_agent] = true
 set :use_sudo, false
 set :scm_verbose, true
  
 #############################################################
 # Git
 #############################################################
  
 set :scm, :git
 set :branch, "master"
 set :repository, "git@github.com:williamcotton/williamcotton.com.git"  
 set :deploy_via, :remote_cache 
 set :copy_exclude, [".git/*"]

#############################################################
#	Passenger
#############################################################

namespace :deploy do
  
  # Restart passenger on deploy
  desc "Restarting mod_rails with restart.txt"
  task :restart, :roles => :app, :except => { :no_release => true } do
    run "touch #{current_path}/tmp/restart.txt"
  end
  
  [:start, :stop].each do |t|
    desc "#{t} task is a no-op with mod_rails"
    task t, :roles => :app do ; end
  end
  
end

after "deploy", "deploy:cleanup"
