# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20141107142953) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "comments", force: true do |t|
    t.integer "user_id"
    t.text    "body"
    t.integer "commentable_id"
    t.string  "commentable_type"
  end

  add_index "comments", ["user_id"], name: "index_comments_on_user_id", using: :btree

  create_table "completions", force: true do |t|
    t.integer  "user_id",    null: false
    t.integer  "item_id",    null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "completions", ["user_id", "item_id"], name: "index_completions_on_user_id_and_item_id", using: :btree

  create_table "friendships", force: true do |t|
    t.integer  "befriender_id",                     null: false
    t.integer  "befriendee_id",                     null: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "status",        default: "PENDING"
  end

  create_table "list_items", force: true do |t|
    t.integer "list_id",                   null: false
    t.string  "content",                   null: false
    t.text    "details"
    t.boolean "completed", default: false
    t.boolean "starred",   default: false
  end

  add_index "list_items", ["list_id"], name: "index_list_items_on_list_id", using: :btree

  create_table "lists", force: true do |t|
    t.integer "owner_id", null: false
    t.string  "title",    null: false
    t.string  "access"
  end

  add_index "lists", ["owner_id"], name: "index_lists_on_owner_id", using: :btree

  create_table "notifications", force: true do |t|
    t.integer  "user_id"
    t.integer  "notifiable_id"
    t.string   "notifiable_type"
    t.integer  "event_id"
    t.boolean  "is_read"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.text     "text"
  end

  create_table "shares", force: true do |t|
    t.integer "user_id", null: false
    t.integer "list_id", null: false
  end

  add_index "shares", ["user_id", "list_id"], name: "index_shares_on_user_id_and_list_id", unique: true, using: :btree

  create_table "users", force: true do |t|
    t.string   "username"
    t.string   "email",           null: false
    t.string   "password_digest", null: false
    t.string   "session_token",   null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree

end
