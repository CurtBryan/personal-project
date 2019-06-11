select event_name, date, time, location, info, event_pic, first_name from event
join users on (users.user_id = event.creator_id )
where event_id = $1;

-- insert into event (event_name, date, time, location, info, event_pic, creator_id)
-- values ( 'Adoption Day!!!', '11-17-2019', '7pm', '1234 E. Main Boulevard' , 'Come Adopt A cute Puppy or kitten and make your family complete', 'https://cdn.pixabay.com/photo/2016/07/15/15/55/dachshund-1519374__480.jpg', '3' );
-- select * from event;