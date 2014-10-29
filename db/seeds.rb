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