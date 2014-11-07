class Api::SessionsController < ApplicationController
  def new
    @user = User.new
  end

  def create
    user = User.find_by_credentials(
      params[:email],
      params[:password]
    )

    if user
      sign_in(user)
      render json: user
    else
      flash.now[:errors] = ["Invalid Email/Password combo"]
      render :new
    end

  end

  def destroy
    sign_out
    render json: ["Signed Out!"]
  end

end
