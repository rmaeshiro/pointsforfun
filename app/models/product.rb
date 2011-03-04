class Product < ActiveRecord::Base
	belongs_to :point
	has_many :category
	has_many :cart
  has_one :order_detail
end
