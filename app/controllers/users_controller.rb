class UsersController < ApplicationController

  before_filter :require_signed_in!, only: [:show, :index]

  def index

  end

  def show
    @user = User.find(params[:id])
    @search = []
    @friends = current_user.friends
    @sent_request_users = current_user.pending_friends
    @received_request_users = current_user.potential_friends
  end

  def new
    @user = User.new
    render :new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      sign_in(@user)
      redirect_to root_url
    else
      flash.now[:errors] = @user.errors.full_messages
      render :new
    end
  end

  def edit
  end

  def update
  end

  def search
    @user = User.find(params[:id])
    if /^[[:alpha:]\s@\.]+$/.match(params[:searchstring])
      @search = User.where("username LIKE '%#{params[:searchstring]}%' OR email LIKE '%#{params[:searchstring]}%'")
    else
      @search = []
    end
    @friends = current_user.friends
    @sent_request_users = current_user.pending_friends
    @received_request_users = current_user.potential_friends
    render :show
  end



  private

  def user_params
    params.require(:user).permit(:username, :email, :password)
  end

end
