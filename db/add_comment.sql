insert into comments (message, user_id, event_id)
values ($1, $2, $3);

select * from comments;