insert into events_attended (user_id, event_id)
values ($1, $2);

select * from events_attended;
