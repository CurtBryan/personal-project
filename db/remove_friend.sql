delete from friends_list
where user_id=$1 and friend_id=$2;

delete from friends_list
where user_id=$2 and friend_id=$1;

select * from friends_list where user_id=$1;