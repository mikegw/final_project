class Api::NotificationsController < ApplicationController

  def show
    notification = current_user.notifications.find(params[:id])
    notification.update(is_read: true)
    render json: notification
  end

  def index
  end

end
