
create table users(
user_id serial primary key,
first_name varchar(40) not null,
last_name varchar(40) not null,
password text not null,
email text not null,
charity boolean not null,
profile_pic text,
rating integer,
bio text,
future_events int[], 
events_attended int[]
);

create table event(
event_id serial primary key,
event_name text not null,
date text not null,
time text not null,
location text not null,
info text not null,
event_pic text not null,
creator_id integer references users(user_id),
);

create table comments(
    comment_id serial primary key,
    message text not null,
    user_id integer references users(user_id),
    event_id integer references event(event_id)
);
