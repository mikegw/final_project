json.extract! @user, :id, :username, :email

json.lists @user.lists do |list|
  json.extract! list, :id, :owner_id, :title, :access

  json.items list.list_items do |item|
    puts(item)
    json.extract! item, :id, :list_id, :content, :details, :completed, :starred
  end
end