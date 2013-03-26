class HomeController < ApplicationController
  def index
    if @auth.present?
      redirect_to tasks_path
    end
  end
end
