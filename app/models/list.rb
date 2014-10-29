class List < ActiveRecord::Base

  validates :title, :owner_id, presence: true
  validates :access, inclusion: {in: ["PUBLIC", "FRIENDS", "PRIVATE"]}

  belongs_to :owner,
  inverse_of: :lists,
  class_name: "User"

  has_many :list_items, inverse_of: :list, dependent: :destroy

  has_many :shares, inverse_of: :list, dependent: :destroy

  has_many :collaborators, through: :shares, source: :collaborator

end
