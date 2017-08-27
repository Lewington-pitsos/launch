require "minitest/autorun"
require_relative "../logic/player.rb"
require_relative "../logic/sorters.rb"

class PlayerTest < Minitest::Test

  def setup
    @bob = Player.new({name: "bob"})
    @sam = Player.new({name: "sam"})
    @harry = Player.new({name: "harry", score: 1})
    @daniel = Player.new({name: "daniel", score: 0, tiebreak: 0.5})
    @sarah = Player.new({name: "sarah", score: 0, tiebreak: 1})
    @bill = Player.new({name: "bill", score: 0, tiebreak: 99})
    @pair = Pair.new(@bob, @sam)
  end

  def test_bye
    pair = Pair.new(@bob, nil)
    pair.auto_draw
    assert_equal(1, @bob.score)
    assert(pair.winner)
  end

  def test_playing
    assert(@sam.playing)
    @sam.toggle
    refute(@sam.playing)
  end

  def test_finish
    assert_nil @pair.winner
    @pair.auto_draw
    assert(@pair.winner)
  end

  def test_draw
    @pair.auto_draw
    assert_equal(0.5, @bob.score)
    assert_equal(0.5, @bob.tiebreak)
    assert_equal(0.5, @sam.score)
    assert_equal(0.5, @sam.tiebreak)
    assert_equal("DRAW", @pair.winner)
  end

  def test_player_wins
    @pair.win "bob"
    assert_equal(1, @bob.score)
    assert_equal(0, @bob.tiebreak)
    assert_equal(0, @sam.score)
    assert_equal(1, @sam.tiebreak)
    assert_equal("bob", @pair.winner,)
  end

  def test_undo_win
    @pair.auto_draw
    @pair.win "bob"
    assert_equal(1.5, @bob.score)
    assert_equal(1, @bob.tiebreak)
    assert_equal("bob", @pair.winner)
    @pair.undo_win "bob"
    assert_equal(0.5, @bob.score)
    assert_equal(0.5, @bob.tiebreak)
    assert_nil(@pair.winner)
  end

  #----------------------------- BLACK AND WHITE ----------------------------#

  def test_set_colors_round_1
    Sorter.new([@harry, @bill, @sarah, @daniel], 1)
    assert_equal("white", @harry.last_colour)
    assert_equal("white", @bob.last_colour)
    assert_equal("white", @sarah.last_colour)
    assert_equal("black", @sam.last_colour)
    assert_equal("black", @bill.last_colour)
    assert_equal("black", @daniel.last_colour)
  end

  def test_pair_sets_colors
    assert_equal("black", @sam.last_colour)
    assert_equal("white", @bob.last_colour)
  end

  #--------------------------- SORTER ---------------------------------------#

  def test_properly_sorted
    sorter = Sorter.new([@harry, @daniel, @bob, @sarah, @bill], 1)
    assert_equal([@harry, @bill, @sarah, @daniel, @bob], sorter.players)
  end

  def test_properly_paired_first_round
    sorter = Sorter.new([@harry, @daniel, @bob, @sarah, @bill, @sam], 1)
    assert_equal(@harry, sorter.pairs[0].white)
    assert_equal(@sarah, sorter.pairs[1].white)
    assert_equal(@sam, sorter.pairs[2].white)
  end

  def test_paired_with_bye_first_round
    sorter = Sorter.new([@daniel, @bob, @sarah, @bill, @sam], 1)
    assert_equal(3, sorter.pairs.length)
    assert_equal(@bob, sorter.pairs[-1].black)
  end

  def test_not_same_colour_twice
    Sorter.new([@harry, @bill, @sarah, @daniel], 1)
    Sorter.new([@harry, @daniel, @bob, @sarah, @bill, @sam], 2)
    assert_equal("black", @harry.last_colour)
    assert_equal("white", @bill.last_colour)
    assert_equal("black", @sarah.last_colour)
    assert_equal("white", @daniel.last_colour)
    assert_equal("black", @bob.last_colour)
    assert_equal("white", @sam.last_colour)

    Sorter.new([@harry, @daniel, @bob, @sarah, @bill, @sam], 3)
    assert_equal("white", @harry.last_colour)
    assert_equal("white", @bob.last_colour)
    assert_equal("white", @sarah.last_colour)
    assert_equal("black", @sam.last_colour)
    assert_equal("black", @bill.last_colour)
    assert_equal("black", @daniel.last_colour)
  end

  def test_sorts_by_colour
    sorter = Sorter.new([@harry, @bill, @sarah, @daniel], 1)
    tourney = Round.new(sorter.pairs)
    tourney.win "sarah"
    sorter = Sorter.new([@harry, @daniel, @bob, @sarah, @bill, @sam], 2)
    assert_equal(@bill, sorter.pairs[0].white)
    assert_equal(@sarah, sorter.pairs[0].black)
    assert_equal(@harry, sorter.pairs[1].black)
    assert_equal(@daniel, sorter.pairs[1].white)
  end

  # ---------------------------------TOURNEY -------------------------------- #

  def test_tourney_win
    sorter = Sorter.new([@harry, @daniel, @bob, @sarah, @bill, @sam], 1)
    tourney = Round.new(sorter.pairs)
    tourney.win "sarah"
    assert_equal(1, @sarah.score)
  end

  def test_tourney_draw
    sorter = Sorter.new([@harry, @daniel, @bob, @sarah, @bill, @sam], 1)
    tourney = Round.new(sorter.pairs)
    tourney.draw "harry"
    assert_equal(1.5, @harry.score)
    assert_equal(0.5, @bill.score)
  end

  def test_tourney_round_finish
    sorter = Sorter.new([@harry, @daniel, @bob, @sarah, @bill, @sam], 1)
    tourney = Round.new(sorter.pairs)
    tourney.win "harry"
    tourney.finish_round
    assert_equal(2, @harry.score)
    assert_equal(0, @bill.score)
    assert_equal(0.5, @sam.score)
    assert_equal(0.5, @sarah.score)
  end

  def test_tourney_undo_win
    sorter = Sorter.new([@harry, @daniel, @bob, @sarah, @bill, @sam], 1)
    tourney = Round.new(sorter.pairs)
    tourney.win "sarah"
    assert_equal(1, @sarah.score)
    tourney.undo_win "sarah"
    assert_equal(0, @sarah.score)
  end

end
