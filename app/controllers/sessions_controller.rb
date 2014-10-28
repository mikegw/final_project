class SessionsController < ApplicationController
  def new
    user = User.new
  end

  def create
    user = User.find_by_credentials(
      params[:email],
      params[:password]
    )

    if user
      sign_in(user)
      redirect_to root_url
    else
      flash.now[:errors] = ["Invalid Email/Password combo"]
      render :new
    end

  end

  def destroy
    fail
    sign_out
    redirect_to new_session_url
  end

end