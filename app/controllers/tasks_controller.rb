class TasksController < ApplicationController
  def index
    if@auth.nil?
        redirect_to(root_path)
    end
    @tasks = @auth.tasks
  end


  def create
    task = Task.create(params[:task])
    @auth.tasks << task
    render :json => masterarray
  end

  def toggledone
    task = Task.find(params[:id])
    task.is_complete = !(task.is_complete)
    task.save
    render :json => masterarray
  end

  def all # ONLY USED FOR INITIAL POPULATION
      render :json => masterarray
  end


  def clearcompleted
#@auth.tasks.where(:is_complete => true).destroy
  @auth.tasks.each do |task|
      task.destroy if task.is_complete
  end
  render :json => masterarray
  end

  def update
      id = params[:id]
      task = Task.find(id)
      task.update_attributes(params[:task])
      render :json => masterarray
  end


end
