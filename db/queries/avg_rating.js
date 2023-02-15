`SELECT DISTINCT resources.id, AVG(rating) as average_rating
FROM reviews
inner JOIN resources on resources.id = resource_id
GROUP BY resources.id, reviews.id

;`