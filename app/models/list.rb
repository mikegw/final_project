class List < ActiveRecord::Base

  validates :title, :owner_id, presence: true
  validates :access, inclusion: {in: ["PUBLIC", "FRIENDS", "PRIVATE"]}

  belongs_to :owner,
  inverse_of: :lists,
  class_name: "User"



end
