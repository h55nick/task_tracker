class UsersController < ApplicationController
  def index
    @users = User.all
  end
  def new
    @user = User.new
  end
  def create
    u1 = User.new(params[:user])
    if u1.save
      u1.priorities << Priority.create(:color=> '#8E2800', :name => 'High', :value => 100)
      u1.priorities << Priority.create(:color=> '#FFB03B', :name => 'Medium', :value => 50)
      u1.priorities << Priority.create(:color=> '#468966', :name => 'Low', :value => 0)
      u1.tasks << Task.create(:title=>'Add Tasks', :description => 'Stay Organized by adding tasks',:duedate=> Time.now)
      u1.tasks.first.priority_id = u1.priorities.first.id
      u1.tasks.first.save
    end
    redirect_to(login_path)
  end
end
