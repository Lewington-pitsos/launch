class Machine

  def start
    flip_switch(:on)
  end

  def stop
    flip_switch(:off)
  end

  def flip state
    flip_switch(state)
  end

  private

  attr_writer :switch

  def flip_switch(desired_state)
    self.switch = desired_state
  end
end

burt = Machine.new

burt.start

burt.stop

burt.flip(:off)
