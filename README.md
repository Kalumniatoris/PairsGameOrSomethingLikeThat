# PairsGameOrSomethingLikeThat
https://kalumniatoris.github.io/PairsGameOrSomethingLikeThat/

Simple puzzle game where you need to match pairs.

Each symbol on board have 3 parameters: Shape, Colour of it's inside, Colour of it's border.
Shapes match when there are [Game mode] common ones.

[Game mode] is represented as range.
E.g: 

3-3 - both symbols need to be identical (3 common parameters)

2-3 - at least 2 parameters need to equal.

0-0 - none of parameters may match.

0-2 - anything that's completely identical is fine.

etc.

Goal (like in most pair match games) is to reduce symbols on board to 0 or 1.

Generator options:

Shapes / colors / border colors: amount of types of specific parameter to generate. Values outside of ranges of inputs (like 1 for colours, or 10 for shapes) may work, may crash game, may be working copletely fine technically but be useless for player. Are used at player own risk

Size: Game board is always generated as a square, size applies to edge of that square, therefore there would be size^2 symbols on board.

Game mode - see above, min and max for rules.

Each generated game (as long as settings are in their ranges) is solveable. (it's hard to generate GM 0-0 when there is only one colour allowed)

In game options:

Shuffle - well, shufles symbols on board.

Randomize colors - changes used palette, (sometimes game may generate colours that are too similar to each other)

Toggle annoying mode - To make it even more annoying there is no indication if it's on or not, it makes game much more annoying.


Used:

[p5.js](https://p5js.org) for graphics.

[noUiSlider (and wNumb)](https://refreshless.com/nouislider/) for game mode slider.
