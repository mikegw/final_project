class Friendship < ActiveRecord::Base

  validates_uniqueness_of :befriendee, scope: :befriender

  belongs_to :befriender, class: "User"
  belongs_to :befriendee, class: "User"

end