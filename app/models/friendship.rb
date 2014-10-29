class Friendship < ActiveRecord::Base

  validates_uniqueness_of :befriendee_id, scope: :befriender_id

  belongs_to :befriender, class_name: "User"
  belongs_to :befriendee, class_name: "User"

end