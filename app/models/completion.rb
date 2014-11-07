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
    notification = self.notifications.unread.event(:completion).new
    notification.user = self.user
    users = self.item.list.collaborators.pluck(:id) + [self.item.list.owner.id];

    p self.item
    p self.item.list
    p self.item.list.collaborators
    p users


    if notification.save
      parsed_notification =  {
        id: notification.id,
        text: notification.text,
        is_read: notification.is_read,
        created_at: notification.created_at
      }

      p parsed_notification

      Pusher["momeRaths"].trigger("newNotification", {
        notification: parsed_notification,
        users: users - [notification.user_id]
      })
    end
  end

end
