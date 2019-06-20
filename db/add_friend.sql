insert into friends_list(user_id, friend_id)
values($1, $2),
($2, $1);

select * from friends_list
where user_id=$1; 