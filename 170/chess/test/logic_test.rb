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

  #--------------------------- SORTER ---------------------------------------#

  def test_properly_sorted
    sorter = Sorter.new([@harry, @daniel, @bob, @sarah, @bill])
    assert_equal([@harry, @bill, @sarah, @daniel, @bob], sorter.players)
  end

  def test_properly_paired
    sorter = Sorter.new([@harry, @daniel, @bob, @sarah, @bill, @sam])
    assert_equal(sorter.pairs[0].white, @harry)
    assert_equal(sorter.pairs[1].white, @sarah)
    assert_equal(sorter.pairs[2].white, @sam)
  end

  def test_paired_with_bye
    sorter = Sorter.new([@daniel, @bob, @sarah, @bill, @sam])
    assert_equal(3, sorter.pairs.length)
    assert_equal(sorter.pairs[-1].white, @bob)
  end

  # ---------------------------------TOURNEY -------------------------------- #

  def test_tourney_win
    sorter = Sorter.new([@harry, @daniel, @bob, @sarah, @bill, @sam])
    tourney = Round.new(sorter.pairs)
    tourney.win "sarah"
    assert_equal(1, @sarah.score)
  end

  def test_tourney_draw
    sorter = Sorter.new([@harry, @daniel, @bob, @sarah, @bill, @sam])
    tourney = Round.new(sorter.pairs)
    tourney.draw "harry"
    assert_equal(1.5, @harry.score)
    assert_equal(0.5, @bill.score)
  end

  def test_tourney_round_finish
    sorter = Sorter.new([@harry, @daniel, @bob, @sarah, @bill, @sam])
    tourney = Round.new(sorter.pairs)
    tourney.win "harry"
    tourney.finish_round
    assert_equal(2, @harry.score)
    assert_equal(0, @bill.score)
    assert_equal(0.5, @sam.score)
    assert_equal(0.5, @sarah.score)
  end

  def test_tourney_undo_win
    sorter = Sorter.new([@harry, @daniel, @bob, @sarah, @bill, @sam])
    tourney = Round.new(sorter.pairs)
    tourney.win "sarah"
    assert_equal(1, @sarah.score)
    tourney.undo_win "sarah"
    assert_equal(0, @sarah.score)
  end

end
