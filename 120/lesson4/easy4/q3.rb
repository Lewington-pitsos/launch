class InvoiceEntry
  attr_reader :quantity, :product_name

  def initialize(product_name, number_purchased)
    @quantity = number_purchased
    @product_name = product_name
  end

  def update_quantity(updated_count)
    quantity = updated_count if updated_count >= 0
  end
end

# the only problem that i can frosee is that we can now access product_name
# (@produc_name) with a setter method, which might lead to us changing it
# at some point, which we probably never really want to do, so maybe change the
# accessor to protected (not private or else the self. construct will die) or
# keep product_name in reader and add a seperate acessor for quantity
