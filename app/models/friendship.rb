class Friendship < ActiveRecord::Base

  validate :no_current_friendship_status

  belongs_to :befriender, class_name: "User"
  belongs_to :befriendee, class_name: "User"

  def no_current_friendship_status
    user1 = User.find(self.befriendee_id)
    user2 = User.find(self.befriender_id)
    if user1.friends.include?(user2) || user2.friends.include?(user1)
      errors.add("Oops, something went wrong!")
      errors.add("Maybe you are already friends, or perhaps there is an outstanding friend request")
    end
  end

end