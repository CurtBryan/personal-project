select future_events_id, event.event_id, event_name, date, event_pic from future_events
join event on (future_events.event_id = event.event_id)
where user_id = $1;
