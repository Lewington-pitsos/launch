ALPHABET = %w(a b c d e f g h i j k l m n o p q r s t u v w x y z)

def decode str

  words = str.split("\n")

  words.map do |word|

    name = word.split(/[^a-zA-Z]/)
    
    name.map do |x|
      x.chars.map! {|i| ALPHABET[ALPHABET.index(i.downcase) - 13]}.join()
    end

  end

end

p decode "Nqn Ybirynpr
Tenpr Ubccre
Nqryr Tbyqfgvar
Nyna Ghevat
Puneyrf Onoontr
Noqhyynu Zhunzznq ova Zhfn ny-Xujnevmzv
Wbua Ngnanfbss
Ybvf Unvog
Pynhqr Funaaba
Fgrir Wbof
Ovyy Tngrf
Gvz Orearef-Yrr
Fgrir Jbmavnx
Xbaenq Mhfr
Fve Nagbal Ubner
Zneiva Zvafxl
Lhxvuveb Zngfhzbgb
Unllvz Fybavzfxv
Tregehqr Oynapu"
