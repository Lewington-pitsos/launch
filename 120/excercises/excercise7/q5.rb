class Minilang

  VALIDS = %w(PUSH ADD SUB MULT DIV MOD POP PRINT)

  attr_reader :register, :stack, :commands

  def initialize(commands)
    @register = 0
    @stack = []
    @commands = commands.split()
    understand
  end

  def understand
    commands.each do |i|
      if i.to_i.to_s == i
        reg i.to_i
      else
        unless VALIDS.include?(i)
          puts "ERROR: invalid input: #{i}"
          return
        end
        send i.downcase
      end
    end
  end

  def reg n
    @register = n
  end

  def push
    stack << register
    stack
  end

  def add
    empty_error
    @register = stack.pop + register
  end

  def sub
    empty_error
    @register = register - stack.pop
  end

  def mult
    empty_error
    @register = register * stack.pop
  end

  def div
    empty_error
    @register = register / stack.pop
  end

  def mod
    empty_error
    @register = register % stack.pop
  end

  def empty_error
    if stack.empty?
      puts "ERROR: the stack is empty"
      return
    end
  end

  def pop
    @register = stack.pop
  end

  def print
    puts @register
  end

end

Minilang.new('5 PUSH 3 MULT PRINT')
# 15

Minilang.new('5 PRINT PUSH 3 PRINT ADD PRINT')
# 5
# 3
# 8

Minilang.new('5 PUSH 10 PRINT POP PRINT')
# 10
# 5

Minilang.new('5 PUSH POP POP PRINT')
# Empty stack!

Minilang.new('3 PUSH PUSH 7 DIV MULT PRINT ')
# 6

Minilang.new('4 PUSH PUSH 7 MOD MULT PRINT ')
# 12

Minilang.new('-3 PUSH 5 XSUB PRINT')
# Invalid token: XSUB

Minilang.new('-3 PUSH 5 SUB PRINT')
# 8

Minilang.new('6 PUSH')
# (nothing printed; no PRINT commands)
