update comments set message = $1 where comment_id = $2;
select * from comments 
join users on (comments.user_id = users.user_id)
where event_id = $3;