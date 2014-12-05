Tileset Gen
=========

Tileset gen it’s a tool to make draw tilesets easier!

In the last 3 months i finished two games, one to [ludum dare 30](http://www.ludumdare.com/compo/ludum-dare-30/?action=preview&uid=41337) and another one to [js13k games 2014](http://js13kgames.com/entries/elemental-block-shooters). The two games are tile-based, have different terrains and each terrein need a tileset with 47 tiles to make all combinations. What means the i need to draw 47 different tiles to each terrain.

I wanted to make this process easier, so i was think a lot about make a tileset generator, something that receive a small tileset base, and output a tileset with 47 tiles, or 16 tiles or etc.

How it works
==========

Let’s say that you want a tileset each tile 32x32 size. The size of the tileset base in this case had to be 64x96, and follow this pattern:

![Base to generate a tileset 32x32 each tile](http://i.imgur.com/OQZggER.png)

If you want 64x64 tiles, the base had to be 128x196. The math works like this:

32x32 tiles:
width: 32 * 2 = 64;
height: 32 * 3 = 96;

48x48 tiles:
width: 48 * 2 = 96;
height: 48 * 3 = 144;

64x64 tiles:
width: 64 * 2 = 128;
height: 64 * 3 = 196;

You got the idea!

Some examples:
----------------------


Generate 32x32 tiles:

![tileset base example 1](http://i.imgur.com/NQs3KxC.png)

Generate 16x16 tiles:

![ tileset base example 2](http://i.imgur.com/7F9407n.png)

Generate 32x32 tiles that don't match corners:

![tileset base example 2](http://i.imgur.com/JerC94P.png)

This last base example it's for use with type 2 tile set (that generate 16 tiles), or with the type 3 (bitwise), that generate a tileset to use with the [bitwise auto tile algorithm](http://www.saltgames.com/2010/a-bitwise-method-for-applying-tilemaps/)!

You can download these examples and use to test the app! When upload the tileset base, you need to set the tile size in the edit bar.

You can upload how much tileset base you want; you can delete them if you want; you can change the type of each tileset by clicking then; when all it’s done, you can download a png of everything.

The app it’s in alpha and I need feedback! Let me know if this app help you in something, and how did you think this can be better. Send me a tweet on [@EdoardoLopes](https://twitter.com/EdoardoLopes)!
