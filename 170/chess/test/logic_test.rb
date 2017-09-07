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

  def test_bye_works_in_pair
    pair = Pair.new(@bob, Player.new({name: "BYE"}))
    pair.auto_draw
    assert_equal(1, @bob.score)
    assert(pair.winner)
  end

  def test_bye_assigned_to_last_player_first_round
    sorter = Sorter.new([@harry, @sarah, @bob])
    sorter.pair
    assert_equal(@bob, sorter.pairs[1].black)
    assert_equal("BYE", sorter.pairs[1].white.name)
  end

  def test_bye_assigned_to_last_player_later_rounds
    sorter = Sorter.new([@harry, @sarah, @sam])
    sorter.pair
    assert_equal(@sam, sorter.pairs[1].white)
    assert_equal("BYE", sorter.pairs[1].black.name)
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
    Sorter.new([@harry, @bill, @sarah, @daniel]).pair
    assert_equal("black", @harry.last_colour)
    assert_equal("white", @bob.last_colour)
    assert_equal("black", @sarah.last_colour)
    assert_equal("black", @sam.last_colour)
    assert_equal("white", @bill.last_colour)
    assert_equal("white", @daniel.last_colour)
  end

  def test_pair_sets_colors
    assert_equal("black", @sam.last_colour)
    assert_equal("white", @bob.last_colour)
  end

  def test_new_player_auto_assigned_colour
    assert_equal("black", @sam.last_colour)
    assert_nil(@harry.last_colour)
    Sorter.new([@harry, @sam]).pair
    assert_equal("white", @sam.last_colour)
    assert_equal("black", @harry.last_colour)

    assert_equal("white", @bob.last_colour)
    assert_nil(@sarah.last_colour)
    Sorter.new([@sarah, @bob]).pair
    assert_equal("black", @bob.last_colour)
    assert_equal("white", @sarah.last_colour)
  end

  def test_assigning_colours_to_new_players_in_later_rounds
    assert_nil(@harry.last_colour)
    assert_nil(@sarah.last_colour)
    Sorter.new([@sarah, @harry]).pair
    assert_equal("black", @harry.last_colour)
    assert_equal("white", @sarah.last_colour)
  end

  def test_more_of_one_colour
    Pair.new(@sarah, @bill)
    Pair.new(@daniel, @harry)
    sorter = Sorter.new([@bob, @daniel, @sarah, @sam])
    sorter.pair
    assert_equal("daniel", sorter.pairs[-1].white.name)
    assert_equal("bob", sorter.pairs[-1].black.name)
    assert_equal("sarah", sorter.pairs[0].black.name)
    assert_equal("sam", sorter.pairs[0].white.name)
  end

  #--------------------------- SORTER ---------------------------------------#

  def test_properly_sorted
    sorter = Sorter.new([@harry, @daniel, @bob, @sarah, @bill])
    assert_equal([@harry, @bill, @sarah, @daniel, @bob], sorter.players)
  end

  def test_not_playing_sort
    @harry.toggle
    sorter = Sorter.new([@harry, @daniel, @bob, @sarah, @bill])
    assert_equal(@harry, sorter.players[-1])
  end

  def test_properly_paired_first_round_with_black_higher
    sorter = Sorter.new([@harry, @daniel, @bob, @sarah, @bill, @sam])
    sorter.pair
    assert_equal(@harry, sorter.pairs[0].black)
    assert_equal(@sarah, sorter.pairs[1].black)
    assert_equal(@sam, sorter.pairs[2].white)
  end

  def test_paired_with_bye_first_round
    sorter = Sorter.new([@daniel, @bob, @sarah, @bill, @sam])
    sorter.pair
    assert_equal(3, sorter.pairs.length)
    assert_equal(@bob, sorter.pairs[-1].black)
  end

  def test_not_same_colour_twice
    Sorter.new([@harry, @bill, @sarah, @daniel]).pair
    Sorter.new([@harry, @daniel, @bob, @sarah, @bill, @sam]).pair
    assert_equal("white", @harry.last_colour)
    assert_equal("black", @bill.last_colour)
    assert_equal("white", @sarah.last_colour)
    assert_equal("black", @daniel.last_colour)
    assert_equal("black", @bob.last_colour)
    assert_equal("white", @sam.last_colour)

    Sorter.new([@harry, @daniel, @bob, @sarah, @bill, @sam]).pair
    assert_equal("black", @harry.last_colour)
    assert_equal("white", @bob.last_colour)
    assert_equal("black", @sarah.last_colour)
    assert_equal("black", @sam.last_colour)
    assert_equal("white", @bill.last_colour)
    assert_equal("white", @daniel.last_colour)
  end

  def test_sorts_by_colour
    sorter = Sorter.new([@harry, @bill, @sarah, @daniel])
    tourney = Round.new(sorter.pair)
    tourney.win "sarah"
    sorter = Sorter.new([@harry, @daniel, @bob, @sarah, @bill, @sam])
    sorter.pair
    assert_equal(@bill, sorter.pairs[0].black)
    assert_equal(@sarah, sorter.pairs[0].white)
    assert_equal(@harry, sorter.pairs[1].white)
    assert_equal(@daniel, sorter.pairs[1].black)
  end

  # ---------------------------------TOURNEY -------------------------------- #

  def test_tourney_win
    sorter = Sorter.new([@harry, @daniel, @bob, @sarah, @bill, @sam])
    tourney = Round.new(sorter.pair)
    tourney.win "sarah"
    assert_equal(1, @sarah.score)
  end

  def test_tourney_draw
    sorter = Sorter.new([@harry, @daniel, @bob, @sarah, @bill, @sam])
    tourney = Round.new(sorter.pair)
    tourney.draw "harry"
    assert_equal(1.5, @harry.score)
    assert_equal(0.5, @bill.score)
  end

  def test_tourney_round_finish
    sorter = Sorter.new([@harry, @daniel, @bob, @sarah, @bill, @sam])
    tourney = Round.new(sorter.pair)
    tourney.win "harry"
    tourney.finish_round
    assert_equal(2, @harry.score)
    assert_equal(0, @bill.score)
    assert_equal(0.5, @sam.score)
    assert_equal(0.5, @sarah.score)
  end

  def test_tourney_undo_win
    sorter = Sorter.new([@harry, @daniel, @bob, @sarah, @bill, @sam])
    tourney = Round.new(sorter.pair)
    tourney.win "sarah"
    assert_equal(1, @sarah.score)
    tourney.undo_win "sarah"
    assert_equal(0, @sarah.score)
  end

end
