insert into users (first_name, last_name, password, email, charity, profile_pic)
values ($1, $2, $3, $4, $5, $6);
select first_name from users
where email = $4

