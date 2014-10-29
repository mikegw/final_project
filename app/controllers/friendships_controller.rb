class FriendshipsController < ApplicationController

  def create
    user = User.find(params[:user_id])

    friendship1 = current_user.friendships.new(
      befriendee_id: user.id
    )

    friendship2 = user.friendships.new(
      befriendee_id: current_user.id
    )

    friend_request = current_user.received_friend_requests.find_by_sender_user_id(user.id)
    friend_request.status = "ACCEPTED"

    ActiveRecord::Base.transaction do
      begin
        friendship1.save!
        friendship2.save!
        friend_request.save!
      rescue ActiveRecord::RecordInvalid
        flash[:errors] = friendship1.errors.full_messages
        flash[:errors] = friendship2.errors.full_messages
      end
    end

    redirect_to URI(request.referer).path
  end

  def destroy
    user = User.find(params[:user_id])

    friendship1 = current_user.friendships.find_by_befriendee_id(user.id)

    friendship2 = user.friendships.find_by_befriendee_id(current_user.id)

    ActiveRecord::Base.transaction do
      begin
        friendship1.destroy!
        friendship2.destroy!
      rescue ActiveRecord::RecordInvalid
        flash[:errors] = friendship1.errors.full_messages
        flash[:errors] = friendship2.errors.full_messages
      end
    end

    redirect_to URI(request.referer).path
  end

end