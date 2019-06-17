delete from comments
where comment_id = $1;

select comment_id, message, comments.user_id, event_id, first_name from comments
join users on (comments.user_id = users.user_id)
where event_id = $2;