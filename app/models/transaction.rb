class Transaction < ActiveRecord::Base
  belongs_to :transaction_type, :primary_key => :code, :foreign_key => :transaction_type_code
  belongs_to :account, :primary_key => :id, :foreign_key => :account_from_id
end
