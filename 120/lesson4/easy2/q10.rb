=begin

(1) lumps togtether data and the methods which interact with that data, so that
    it is easier to seperate both of these out from the general mess of code.
    this is good because:
      (a) it makes it easier to focus on one aspect of the progam at a time
      (b) it makes it easier for other people/future you to go back and be able
          to understand what the code does (by parsing one section at a time)
      (c) it makes it easier to change things in your code, because whenever you
          change something, that change should be isolated to the one specific
          area of data/functionality where you are making the change, and wont
          have horrible and unforseen consiquences on the rest of your code
      (d) it makes your code easier to debug because you can narrow in on
          exactly which isolated area of code is harbouring the problem,
          rather than chasing strands of code all over the place
      (e) makes planning code easier because you now have a (somewhat) concrete
          way of grouping the ideas you have about the program's functionality
          together, and mapping how interactions between different bits of
          code might look
(2) provides an intuitive way of thinking about/looking at code which is at
    least somewhat similar to the noun/verb structure of human languages
(3) it is a widely used convention so it helps different people from different
    places understand and modify each other's code more easily
=end
