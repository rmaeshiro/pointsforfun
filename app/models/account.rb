class Account < ActiveRecord::Base
  belongs_to :user
  validates_uniqueness_of :id, :point_id #, credit_card_number
  has_one :transaction

end
