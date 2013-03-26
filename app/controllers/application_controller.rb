class ApplicationController < ActionController::Base
  protect_from_forgery
  before_filter :authenticate
  private
  def authenticate
    @auth = User.find(session[:user_id]) if session[:user_id].present?
  end

  def masterarray
          otasks = @auth.tasks.joins(:priority).order('priorities.value DESC').order('tasks.title ASC')
          masterarray = []
      otasks.each do |task|
        masterarray.push(task.as_json(:include=>:priority))
      end
      return masterarray
  end



end
