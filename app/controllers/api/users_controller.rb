class Api::UsersController < ApplicationController

  def show
    @user = User.find(params[:id])
  end

  def current
    if signed_in?
      @user = current_user
      puts "\nSending back current user\n"
      render :show
    else
      puts "\nNo current user\n"
      head "Bad Request"
    end
  end

  def create
    @user = User.new(user_params)
    if @user.save
      sign_in(@user)
      render json: @user;
    else
      flash.now[:errors] = @user.errors.full_messages
      render json: [@user.errors.full_messages], status: 422
    end
  end


  def search
    p params
    @user = current_user
    @matchedfriends = @user.friends.where(
      "users.username LIKE ?",
      "%" + params[:searchstring] + "%"
    ).limit(5)

    if @matchedfriends.length < 5
      @matchedusers = User.where(
        "users.username LIKE ?",
        "%" + params[:searchstring] + "%"
      ).limit(5 - @matchedfriends.length)
    end

    render :search
  end

  private

  def user_params
    params.require(:user).permit(:username, :email, :password)
  end
end
