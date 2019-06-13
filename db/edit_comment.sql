update comments set message = $1 where comment_id = $2;
select * from comments where event_id = $3;