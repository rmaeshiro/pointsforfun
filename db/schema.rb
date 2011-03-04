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
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20110303155138) do

  create_table "accounts", :force => true do |t|
    t.integer  "user_id"
    t.integer  "point_id"
    t.integer  "card_number"
    t.date     "date_valid"
    t.string   "cvv"
    t.decimal  "balance",     :precision => 8, :scale => 2, :default => 0.0
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "carts", :force => true do |t|
    t.integer  "user_id"
    t.integer  "product_id"
    t.integer  "quantity",   :default => 1
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "categories", :force => true do |t|
    t.string   "title"
    t.integer  "parent_id",  :default => 0
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "countries", :force => true do |t|
    t.integer  "code"
    t.string   "iso_code2"
    t.string   "iso_code3"
    t.string   "name"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "currencies", :force => true do |t|
    t.string   "name"
    t.string   "symbol"
    t.string   "abbreviation"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "order_details", :force => true do |t|
    t.float    "order_id"
    t.integer  "product_id"
    t.integer  "point_id"
    t.integer  "point_value"
    t.integer  "quantity"
    t.decimal  "currency_value", :precision => 8, :scale => 2
    t.decimal  "quotation",      :precision => 8, :scale => 2
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "order_logs", :force => true do |t|
    t.float    "order_id"
    t.datetime "date_status"
    t.integer  "order_status_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "order_statuses", :force => true do |t|
    t.string   "description"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "code"
  end

  create_table "orders", :force => true do |t|
    t.datetime "date"
    t.integer  "user_id"
    t.decimal  "currency_value"
    t.integer  "order_status_id",          :default => 1
    t.integer  "payment_type_id"
    t.integer  "payment_method_id"
    t.datetime "payment_date"
    t.string   "cc_capturado"
    t.string   "cc_numero_autorizado"
    t.string   "cc_numero_transacao"
    t.string   "cc_numero_cv"
    t.string   "cc_nacionalidade_emissor"
    t.string   "cc_codigo_retorno"
    t.string   "boleto_nosso_numero"
    t.string   "boleto_vencimento"
    t.float    "gateway_transaction_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "payment_methods", :force => true do |t|
    t.string   "code"
    t.string   "description"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "payment_types", :force => true do |t|
    t.integer  "code"
    t.string   "name"
    t.string   "company"
    t.string   "institution"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "points", :force => true do |t|
    t.string   "name"
    t.integer  "currency_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "products", :force => true do |t|
    t.string   "name"
    t.text     "description"
    t.string   "image"
    t.integer  "point_id"
    t.decimal  "points_value"
    t.decimal  "currency_value"
    t.integer  "category_id"
    t.boolean  "active"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "profiles", :force => true do |t|
    t.string   "first_name"
    t.string   "last_name"
    t.string   "sex_id"
    t.date     "date_of_birth"
    t.string   "CPF"
    t.string   "RG"
    t.string   "street_address1"
    t.string   "street_address2"
    t.string   "street_number"
    t.string   "city"
    t.integer  "zip_code"
    t.string   "state_id"
    t.integer  "country_id"
    t.integer  "phone_country_id"
    t.integer  "phone_number"
    t.integer  "mobile_country_id"
    t.integer  "mobile_number"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "quotations", :force => true do |t|
    t.datetime "date"
    t.integer  "currency_id"
    t.decimal  "value",       :precision => 8, :scale => 2
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "transaction_types", :force => true do |t|
    t.integer  "code"
    t.string   "name"
    t.string   "type_value"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "transactions", :force => true do |t|
    t.datetime "date"
    t.integer  "account_id"
    t.integer  "transaction_type_code"
    t.decimal  "points_value",          :precision => 8, :scale => 2
    t.integer  "account_from_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "users", :force => true do |t|
    t.string   "email",                               :default => "",    :null => false
    t.string   "encrypted_password",   :limit => 128, :default => "",    :null => false
    t.string   "password_salt",                       :default => "",    :null => false
    t.string   "reset_password_token"
    t.string   "remember_token"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",                       :default => 0
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "profile_id"
    t.boolean  "admin",                               :default => false
  end

  add_index "users", ["email"], :name => "index_users_on_email", :unique => true
  add_index "users", ["reset_password_token"], :name => "index_users_on_reset_password_token", :unique => true

end
