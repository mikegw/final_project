json.array! current_user.unread_notifications do |note|
  json.(note, :id, :text, :is_read, :created_at)
end
