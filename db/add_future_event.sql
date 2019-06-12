insert into future_events (user_id, event_id)
values ($1, $2);
select * from future_events;
