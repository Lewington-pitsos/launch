module Taste
  def flavor(flavor)
    puts "#{flavor}"
  end
end

class Orange
  include Taste
end

class HotSauce
  include Taste
end

# Orange: Orange >>> Taste >>> Object >>> Kernel >>> BasicObject
# HotSauce: HotSauce >>> Taste .... etc.
