class PrioritiesController < ApplicationController
  def index
    if @auth.present?
    @priorities = @auth.priorities.order(:value).reverse
  else
    redirect_to root_path
  end
  end


  def create
    color = params[:color]
    name = params[:name]
    value = params[:value]
    priority = Priority.create(:color => color, :name => name, :value => value)
    @auth.priorities << priority
    render :json => [priority]
  end




  def update
      id = params[:id]
      priority = Priority.find(id)
      priority.update_attributes(params[:prior])
      render :json => [priority]
    end


    def  up
          priority = Priority.find(params[:id])
          render :json => priority.swap_higher(@auth)
    end

    def down
          priority = Priority.find(params[:id])
          render :json => priority.swap_lower(@auth)
    end

end