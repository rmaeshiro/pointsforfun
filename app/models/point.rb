class Point < ActiveRecord::Base
	belongs_to :currency
	has_one :product
  has_one :order_detail
end
