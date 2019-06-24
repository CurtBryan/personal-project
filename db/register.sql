insert into users (first_name, last_name, password, email, charity, profile_pic)
values ($1, $2, $3, $4, $5, $6);
select user_id, first_name, last_name, charity, profile_pic, user_id from users
where email = $4

