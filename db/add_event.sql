insert into event (event_name, date, time, location, info, event_pic, creator_id)
values ( $1, $2, $3, $4, $5, $6, $7 );
select * from event;