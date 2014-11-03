class RootsController < ApplicationController

  before_filter :require_signed_in!

  def show
    @user = current_user
    @search = []
    @friends = current_user.friends
    @sent_request_users = current_user.pending_friends
    @received_request_users = current_user.potential_friends
  end

  def search
    @user = current_user
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

end