class FriendshipsController < ApplicationController

  def create
    friendship = current_user.friendships.new(friendship_params)
    unless friendship.save
      flash[:errors] = friendship.errors.full_messages
    end
    redirect_to URI(request.referer).path
  end

end