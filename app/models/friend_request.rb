class FriendRequest < ActiveRecord::Base

  validates_uniqueness_of :sender_user_id, scope: :receiver_user_id

  belongs_to :sender,
  inverse_of: :sent_friend_requests,
  class_name: "User",
  foreign_key: :sender_user_id

  belongs_to :receiver,
  inverse_of: :received_friend_requests,
  class_name: "User",
  foreign_key: :receiver_user_id

end