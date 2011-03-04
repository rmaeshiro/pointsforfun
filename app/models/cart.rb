class Cart < ActiveRecord::Base
  belongs_to :user
	belongs_to :product
	#validate, only 1 product in cart
  validates_uniqueness_of  :user_id, :scope => [ :product_id]
  validates_numericality_of :quantity, :only_integer => true, :greater_than => 0

end
