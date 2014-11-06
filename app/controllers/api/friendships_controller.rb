class Api::FriendshipsController < ApplicationController

  def create
    user = User.find(params[:user_id])

    friendship = current_user.pending_friendships.new(befriendee_id: user.id)

    unless friendship.save
      flash[:errors] = friendship.errors.full_messages
    end
    puts "redirecting to " + URI(request.referer).path
    render json: user
  end

  def accept
    user = User.find(params[:user_id])

    friendship1 = current_user.pending_friendships.new(befriendee_id: user.id)
    friendship2 = user.pending_friendships.find_by_befriendee_id(current_user.id)

    friendship1[:status] = "ACCEPTED"
    friendship2[:status] = "ACCEPTED"

    p friendship1
    p friendship2

    ActiveRecord::Base.transaction do
      begin
        friendship1.save!
        friendship2.save!
      rescue ActiveRecord::RecordInvalid
        flash[:errors] = friendship1.errors.full_messages
        flash[:errors] += friendship2.errors.full_messages
      end
    end

    render json: user
  end

  def reject
    user = User.find(params[:user_id])

    friendship = user.pending_friendships.find_by_befriendee_id(current_user.id)
    friendship[:status] = "REJECTED"

    p friendship

    unless friendship.save!
      flash[:errors] = friendship.errors.full_messages
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

    render json: user
  end

  private

end
