DROP TABLE bids;
DROP TABLE bidders;
DROP TABLE items;


CREATE TABLE bidders (
  id serial PRIMARY KEY,
  name text NOT NULL
);

CREATE TABLE items (
  id serial PRIMARY KEY,
  name text NOT NULL,
  start_price decimal(6,2) NOT NULL,
  sale_price decimal(6,2)
);

CREATE TABLE bids (
  id serial PRIMARY KEY,
  bidder_id INT REFERENCES bidders(id) ON DELETE CASCADE NOT NULL,
  item_id INT REFERENCES items(id) ON DELETE CASCADE NOT NULL,
  amount decimal(6,2) NOT NULL
);

  CREATE INDEX items_bids ON bids(bidder_id, item_id);
