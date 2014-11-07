class Notification < ActiveRecord::Base

  EVENTS = {
    1 => :completion,
    2 => :delegated_item,
    3 => :completed_list,
    4 => :friend_request
  }

  EVENT_IDS = EVENTS.invert

  belongs_to :user, inverse_of: :notifications
  belongs_to :notifiable, inverse_of: :notifications, polymorphic: true

  validates :event_id, inclusion: { in: EVENTS.keys }
  validates :is_read, inclusion: { in: [true, false] }
  validates :notifiable, :user, presence: true

  scope :read, -> { where(is_read: true) }
  scope :unread, -> { where(is_read: false) }
  scope :event, ->(event_name) { where(event_id: EVENT_IDS[event_name]) }

  def text
    case self.event_name
    when :completion
      completion = self.notifiable
      user = self.user
      item = completion.item
      list = item.list
      return "#{user.username} completed \"#{item.content}\" from the list \"#{list.title}\""
    # when :delegated_item
    #   item = self.notifiable
    end
  end

  def event_name
    EVENTS[self.event_id]
  end

end
