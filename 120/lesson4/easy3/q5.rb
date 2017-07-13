class Television
  def self.manufacturer
    # method logic
  end

  def model
    # method logic
  end
end

tv = Television.new
tv.manufacturer
tv.model

Television.manufacturer
Television.model

# manufacturer is a class method, so it will only work when called on line 15
# similarly, model, an instance method, will only ever work when it is called
# thtough an instance of the Television class, like tv
