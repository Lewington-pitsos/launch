\copy bidders (id, name) FROM 'bidders.csv' DELIMITER ',' CSV HEADER;
\copy items (id, name, start_price, sale_price) FROM 'items.csv' DELIMITER ',' CSV HEADER;
\copy bids (id, bidder_id, item_id, amount) FROM 'bids.csv' DELIMITER ',' CSV HEADER;


SELECT *  FROM(SELECT name, count(amount)
        FROM bidders
          INNER JOIN bids ON bids.bidder_id=bidders.id
        GROUP BY name
        ORDER BY count) AS table
    WHERE count > 3;

SELECT
(SELECT name
  FROM bids
    INNER JOIN items ON items.id=bids.item_id
  GROUP BY name;) AS it

  SELECT name
    FROM bids
      INNER JOIN items ON items.id=bids.item_id

    GROUP BY name;

  SELECT name
  FROM items
    WHERE id NOT IN (SELECT item_id FROM bids);

SELECT name
  FROM bidders
  WHERE id IN (SELECT bidder_id FROM bids);

SELECT DISTINCT name
  FROM bidders INNER JOIN bids ON bids.bidder_id=bidders.id;

SELECT name
  FROM items
  WHERE items.id IN (SELECT item_id
    FROM bids
    GROUP BY item_id
    HAVING count(amount) > 2);

  SELECT item_id, name, count(bids.*)
    FROM bids
      INNER JOIN items ON items.id=bids.item_id
    GROUP BY item_id, name;

SELECT *


SELECT name, count
FROM (SELECT name, count(bids.*) FROM bidders
  INNER JOIN bids ON bids.bidder_id=bidders.id
  GROUP BY name
  ORDER BY count DESC) AS tb
LIMIT 1;

# scalar subquery
SELECT name,
  (SELECT count(bids.*) FROM bids WHERE bids.item_id=items.id)
FROM items;

SELECT name, count(bids.*)
  FROM items
    LEFT JOIN bids ON bids.item_id=items.id
  GROUP BY name;

  SELECT id FROM items
  WHERE ROW('Painting', 100.00, 250.00) =
    ROW(name, start_price, sale_price);
