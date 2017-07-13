class InvoiceEntry
  attr_reader :quantity, :product_name

  def initialize(product_name, number_purchased)
    @quantity = number_purchased
    @product_name = product_name
  end

  def update_quantity(updated_count)
    # prevent negative quantities from being set
    quantity = updated_count if updated_count >= 0
  end
end

# all quantity = updated_count  does is return the value of updated_count,
# quantity is not updated, this is probably not what we wanted. Either att @ to
# quantity or make an attr_accessor and use self.quantity
