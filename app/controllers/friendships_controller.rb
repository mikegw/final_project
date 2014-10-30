class FriendshipsController < ApplicationController

  def create
    user = User.find(params[:user_id])

    friendship = current_user.friendships.new(befriendee_id: user.id)

    unless friendship.save
      flash[:errors] = friendship.errors.full_messages
    end

    redirect_to URI(request.referer).path
  end

  def update(new_status)
    user = User.find(params[:user_id])

    friendship1 = current_user.friendships.new(befriendee_id: user.id)
    friendship2 = user.friendships.find_by_befriendee_id(current_user.id)
    friendship1[:status] = new_status
    friendship2[:status] = new_status

    ActiveRecord::Base.transaction do
      begin
        friendship1.save!
        friendship2.update!
      rescue ActiveRecord::RecordInvalid
        flash[:errors] = friendship1.errors.full_messages
        flash[:errors] = friendship2.errors.full_messages
      end
    end

    redirect_to URI(request.referer).path
  end

  def accept
    update("ACCEPTED")
  end

  def reject
    update("REJECTED")
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

  private

end