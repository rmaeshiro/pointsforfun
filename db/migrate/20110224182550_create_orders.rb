class CreateOrders < ActiveRecord::Migration
  def self.up
    create_table :orders do |t|
      t.datetime :date
      t.integer :user_id
      t.decimal :currency_value, :precision => 8, :scale => 2
      t.integer :order_status_id, :default => 0
      t.integer :payment_type_id
      t.integer :payment_method_id
      t.datetime :payment_date
      t.string :cc_capturado
      t.string :cc_numero_autorizado
      t.string :cc_numero_transacao
      t.string :cc_numero_cv
      t.string :cc_nacionalidade_emissor
      t.string :cc_codigo_retorno
      t.string :boleto_nosso_numero
      t.string :boleto_vencimento
      t.float :gateway_transaction_id

      t.timestamps
    end
  end

  def self.down
    drop_table :orders
  end
end
