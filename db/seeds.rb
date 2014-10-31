# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

testuser1 = User.create({username: "Alice", email: 'testuser1', password: 'testuser1'})
testuser2 = User.create({username: "White Rabbit", email: 'testuser2', password: 'testuser2'})
testuser3 = User.create({username: "The Hatter", email: 'testuser3', password: 'testuser3'})
testuser4 = User.create({username: "The Cheshire Cat", email: 'testuser4', password: 'testuser4'})

alice_todo = testuser1.lists.create({title: "To Do", access: "PRIVATE"})
alice_favs = testuser1.lists.create({title: "Favorite Creatures", access: "PUBLIC"})
alice_ideas = testuser1.lists.create({title: "Ideas", access: "FRIENDS"})

wr_todo = testuser2.lists.create({title: "To Do", access: "PRIVATE"})

alice_todo.list_items.create({content: "Make a Daisy Chain"})
alice_todo.list_items.create({content: "Follow the White Rabbit"})
alice_todo.list_items.create({content: "Tea with the Red Queen"})

alice_favs.list_items.create({content: "The Jabberwock"})
alice_favs.list_items.create({content: "The March Hare"})
alice_favs.list_items.create({content: "The Caterpillar"})

wr_todo.list_items.create({content: "Check the time"})
wr_todo.list_items.create({content: "Tea with the Red Queen"})



