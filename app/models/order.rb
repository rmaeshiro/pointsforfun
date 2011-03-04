class Order < ActiveRecord::Base
  belongs_to :user
  has_many :order_details, :dependent => :destroy
  belongs_to :order_status
  has_many :order_logs
  belongs_to :payment_method
  belongs_to :payment_type, :primary_key => :code
end
