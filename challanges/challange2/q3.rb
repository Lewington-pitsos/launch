class Translation

  CONVERSIONS = {
    "AUG" => "Methionine",
    "UUC" => "Phenylalanine",
    "UUU" => "Phenylalanine",
    "UUA" => "Leucine",
    "UUG"	=> "Leucine",
    "UCU" => "Serine",
    "UCC" => "Serine",
    "UCA" => "Serine",
    "UCG" => "Serine",
    "UAU" => "Tyrosine",
    "UAC" => "Tyrosine",
    "UGU" => "Cysteine",
    "UGC" => "Cysteine",
    "UGG"	=> "Tryptophan",
    "UAA" => "STOP",
    "UAG" => "STOP",
    "UGA"	=> "STOP"
  }.freeze

  def self.of_cordon str

    cordons = str.scan(/.{3}/)

    acid_list = acids cordons

    acid_list == acid_list[0] if acid_list.length < 2

    acid_list
  end

  def self.acids cordons
    acids = []
    cordons.each do |cordon|

      acid = CONVERSIONS[cordon]

      if acid == "STOP"
        return acids
      elsif acid == nil
        puts "You are not good at Biology"
        exit
      else
        acids << acid
      end

    end

    acids
  end
end


p Translation.of_cordon("sdf")
