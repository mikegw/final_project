class FriendRequestsController < ApplicationController

  def create
    user = User.find(params[:user_id])

    sent_friend_request = current_user.sent_friend_requests.new(
      receiver_user_id: user.id
    )

    unless sent_friend_request.save
      flash[:errors] = sent_friend_request.errors.full_messages
    end

    redirect_to URI(request.referer).path
  end

  def destroy
    user = User.find(params[:user_id])

    sent_friend_request = current_user.received_friend_requests.find_by_sender_user_id(
      user.id
    )

    unless sent_friend_request.destroy
      flash[:errors] = sent_friend_request.errors.full_messages
    end

    redirect_to URI(request.referer).path
  end

end