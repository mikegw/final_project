# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

testusers = []

testusers << User.create!({username: "Alice", email: 'alice@wonderland.com', password: 'alicealice'})
testusers << User.create!({username: "The White Rabbit", email: 'whiterabbit@wonderland.com', password: 'whiterabbit'})
testusers << User.create!({username: "The Hatter", email: 'hatter@wonderland.com', password: 'hatter'})
testusers << User.create!({username: "The Cheshire Cat", email: 'cheshirecat@wonderland.com', password: 'cheshirecat'})
testusers << User.create!({username: "The March Hare", email: 'marchhare@wonderland.com', password: 'marchhare'})
testusers << User.create!({username: "The Caterpillar", email: 'caterpillar@wonderland.com', password: 'caterpillar'})
testusers << User.create!({username: "The Dormouse", email: 'dormouse@wonderland.com', password: 'dormouse'})
testusers << User.create!({username: "The Mock Turtle", email: 'mockturtle@wonderland.com', password: 'mockturtle'})
testusers << User.create!({username: "The Queen of Hearts", email: 'queenofhearts@wonderland.com', password: 'queenofhearts'})
testusers << User.create!({username: "The Dodo", email: 'dodo@wonderland.com', password: 'dodododo'})


shopping_list = [
  "Milk",
  'Sugar',
  "Lemon",
  "Mustard",
  "Butter",
  "Jam Tarts",
  "Teacups",
  "Biscuits",
  "Cake",
  "Lemonade",
  "Orange Juice",
  "Raspberry Jam",
  "Crumpets",
  "Toast"
]

peeps_prefixes = [
  "Tea with ",
  "Croquet with ",
  "Follow the ",
  "Hunt for the ",
  "Go for a walk in the Tulgey Woods with"
]

food_prefixes = [
  "Have some ",
  "Have some more ",
  "Buy some "
]

todos = []

peeps_prefixes.each do |prefix|
  testusers.each do |user|
    todos << prefix + user.username
  end
end

food_prefixes.each do |prefix|
  shopping_list.each do |food|
    todos << prefix + food
  end
end

todos += [
  "Make a chain of daisies",
  "Buy a new pocket-watch",
  "Hunt for the Jabberwock",
  "Have another cup of tea",
  "Check the time!"
]

p todos

testusers.each do |user|
  l1 = user.lists.create!({title: "To do tomorrow", access: "FRIENDS"})
  l2 = user.lists.create!({title: "Plans for the day", access: "FRIENDS"})
  l3 = user.lists.create!({title: "Favorite People", access: "PUBLIC"})
  l4 = user.lists.create!({title: "Favorite Food", access: "PUBLIC"})
  l5 = user.lists.create!({title: "Tea Party plans", access: "PRIVATE"})

  items = todos.shuffle[0..(3 + rand(15))]
  items.each do |item|
    l1.list_items.create!({content: item})
  end

  items = todos.shuffle[0..(3 + rand(15))]
  items.each do |item|
    l2.list_items.create!({content: item})
  end

  favpeeps = testusers.map(&:username).shuffle[0..(1 + rand(6))]
  favpeeps.each do |person|
    l3.list_items.create!({content: person})
  end

  favfood = shopping_list.shuffle[0..(3 + rand(5))]
  favfood.each do |food|
    l4.list_items.create!({content: food})
  end

  foods = shopping_list.shuffle[0..(3 + rand(5))]
  foods.each do |food|
    l5.list_items.create!({content: "Buy some #{food}"})
  end

end

#
# alice_todo = testuser1.lists.create!({title: "To Do", access: "PRIVATE"})
# alice_favs = testuser1.lists.create!({title: "Favorite Creatures", access: "PUBLIC"})
# alice_ideas = testuser1.lists.create!({title: "Ideas", access: "FRIENDS"})
#
# wr_todo = testuser2.lists.create!({title: "To Do", access: "PRIVATE"})
#
# alice_todo.list_items.create!({content: "Make a Daisy Chain"})
# alice_todo.list_items.create!({content: "Follow the White Rabbit"})
# alice_todo.list_items.create!({content: "Tea with the Red Queen"})
#
# alice_favs.list_items.create!({content: "The Jabberwock"})
# alice_favs.list_items.create!({content: "The March Hare"})
# alice_favs.list_items.create!({content: "The Caterpillar"})
#
# wr_todo.list_items.create!({content: "Check the time"})
# wr_todo.list_items.create!({content: "Tea with the Red Queen"})
