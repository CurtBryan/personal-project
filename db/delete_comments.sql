delete from comments
where comment_id = $1;

select * from comments where event_id = $2;