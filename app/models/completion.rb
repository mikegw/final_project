class Completion < ActiveRecord::Base

  validates :user, :item, presence: true

  belongs_to :user,
  inverse_of: :completions

  belongs_to :item,
    class_name: "ListItem",
    foreign_key: :item_id,
    inverse_of: :completions

  has_many :notifications, as: :notifiable, inverse_of: :notifiable, dependent: :destroy

  after_commit :set_notification, on: [:create]

  def set_notification
    puts "almost there"
    notification = self.notifications.unread.event(:completion).new
    notification.user = self.user
    users = self.item.list.collaborators.map(&:id) + [self.item.list.owner.id];

    puts "     users #{users}"


    parsed_notification =  {
      id: notification.id,
      text: notification.text,
      is_read: notification.is_read,
      created_at: notification.created_at,
    }

    if notification.save
      Pusher["momeRaths"].trigger("newNotification", {
        notification: parsed_notification,
        users: users
      })
    end
  end

end
