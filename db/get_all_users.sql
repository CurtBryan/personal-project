select user_id, first_name, last_name, charity, profile_pic from users
where user_id != $1;
