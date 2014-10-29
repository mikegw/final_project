class ListItem < ActiveRecord::Base

  validates :content, presence: true

  belongs_to :list,
  inverse_of: :list_items



end