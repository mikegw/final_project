class Api::UsersController < ApplicationController

  def show
    @user = User.find(params[:id])
  end

  def current
    @user = current_user
    render :show
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


end