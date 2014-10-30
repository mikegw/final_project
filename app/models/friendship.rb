class Friendship < ActiveRecord::Base

  validate :valid_friendship_status

  belongs_to :befriender, class_name: "User"
  belongs_to :befriendee, class_name: "User"

  def valid_friendship_status #TODO ADD CUSTOM ERRORS FOR DIFFERENT TYPES OF FAILU
    user1 = User.find(self.befriender_id)
    user2 = User.find(self.befriendee_id)

    if self.status == "PENDING"
        # user1 can't rerequest
      if user1.friends.include?(user2) || user1.pending_friends.include?(user2) || user1.rejected_friends.include?(user2) ||
        # user1 can't send a request to user2 if he has a pending friend request from user2
        user1.potential_friends.include?(user2)
        self.errors[:base] << "Oops, something went wrong! PENDING"
        self.errors[:base] << "Maybe you are already friends, or perhaps there is an outstanding friend request"
      end
    end

    if self.status == "ACCEPTED"
        # user1 can't accept their own friend request - need to have user2 accept first
      unless user2.pending_friends.include?(user1) || user2.friends.include?(user1)
        self.errors[:base] << "Oops, something went wrong! ACCEPTING"
        self.errors[:base] << "Maybe you are already friends, or perhaps there is an outstanding friend request"
      end
    end

  end

end