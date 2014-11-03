#json.array! @matchedfriends + @matchedusers, :id, :username, :email

# json.lists friend.lists do |list|
#   json.extract! list, :id, :owner_id, :title, :access
#
#   json.items list.list_items do |item|
#     puts(item)
#     json.extract! item, :id, :list_id, :content, :details, :completed, :starred
#   end
# end


json.matchedfriends @matchedfriends do |friend|
  json.extract! friend, :id, :username, :email

  json.lists friend.lists do |list|
    json.extract! list, :id, :owner_id, :title, :access

    json.items list.list_items do |item|
      puts(item)
      json.extract! item, :id, :list_id, :content, :details, :completed, :starred
    end
  end
end

json.matchedusers @matchedusers do |user|
  json.extract! user, :id, :username, :email

  json.lists user.lists do |list|
    json.extract! list, :id, :owner_id, :title, :access

    json.items list.list_items do |item|
      puts(item)
      json.extract! item, :id, :list_id, :content, :details, :completed, :starred
    end
  end
end