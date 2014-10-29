class User < ActiveRecord::Base

  has_many :lists,
  inverse_of: :owner,
  foreign_key: :owner_id

  has_many :friendships, foreign_key: :befriender_id, dependent: :destroy
  has_many :friends, through: :friendships, source: :befriendee


  has_many :received_friend_requests,
  inverse_of: :receiver,
  class_name: "FriendRequest",
  foreign_key: :receiver_user_id,
  dependent: :destroy

  has_many :sent_friend_requests,
  inverse_of: :sender,
  class_name: "FriendRequest",
  foreign_key: :sender_user_id,
  dependent: :destroy


  has_many :users_with_friend_requests,
  inverse_of: :friend_requests_from_users,
  through: :sent_friend_requests,
  source: :receiver

  has_many :friend_requests_from_users,
  inverse_of: :users_with_friend_requests,
  through: :received_friend_requests,
  source: :sender



  validates :username, :password_digest, presence: true
  validates :password, length: { minimum: 6, allow_nil: true }
  validates :email, uniqueness: true

  attr_reader :password

  after_initialize :ensure_session_token


  def self.generate_session_token
    SecureRandom.urlsafe_base64(16)
  end

  def self.find_by_credentials(email, password)
    user = User.find_by_email(email)
    user && user.is_password?(password) ? user : nil
  end

  def reset_session_token!
    self.session_token = User.generate_session_token
    self.save!
    self.session_token
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  private

  def ensure_session_token
    self.session_token ||= User.generate_session_token
  end

end
