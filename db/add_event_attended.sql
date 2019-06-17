insert into events_attended (user_id, event_id)
values ($1, $2);

select event.event_id, event_name, date, event_pic from events_attended
join event on (events_attended.event_id = event.event_id)
where user_id = $1;
