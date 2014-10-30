class User < ActiveRecord::Base

  has_many :lists,
  inverse_of: :owner,
  foreign_key: :owner_id

  has_many :friendships, foreign_key: :befriender_id, dependent: :destroy
  has_many :friends, through: :friendships, source: :befriendee

  has_many :friend_requests,
    class_name: "Friendship",
    foreign_key: :befriendee_id,
    dependent: :destroy

  # def potential_friends
#     User.joins("INNER JOIN friendships ON users.id = friendships.befriender_id")
#       .where("friendships.befriendee_id = ? AND friendships.status = 'PENDING'", self.id)
#   end
#
#   def friend_requests
#     User.joins("INNER JOIN friendships ON users.id = friendships.befriendee_id")
#       .where("friendships.befriender_id = ? AND friendships.status = 'PENDING'", self.id)
#   end

  # def pending_friendships
#     self.friendships.where("friendship.status = 'PENDING")
#   end
#
#   def pending_friend_requests
#     self.friend_requests.
#   end

  has_many :potential_friends,
    through: :friend_requests,
    -> { where(status: 'PENDING') },
    source: :befriender


  has_many :collaborations,
    class_name: "Share",
    inverse_of: :collaborator,
    dependent: :destroy

  has_many :shared_lists,
    through: :collaborations,
    source: :list



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
