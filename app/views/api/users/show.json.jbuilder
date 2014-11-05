json.extract! @user, :id, :username, :email

json.lists @user.lists do |list|
  json.extract! list, :id, :owner_id, :title, :access

  json.items list.list_items do |item|
    json.extract! item, :id, :list_id, :content, :details, :completed, :starred
  end

  json.collaborators list.collaborators do |user|
    json.extract! user, :id, :username, :email
  end
end

json.shared_lists @user.shared_lists do |list|
  puts list
  json.extract! list, :id, :owner_id, :title, :access

  json.items list.list_items do |item|
    json.extract! item, :id, :list_id, :content, :details, :completed, :starred
  end

  json.collaborators list.collaborators do |user|
    json.extract! user, :id, :username, :email
  end

end
