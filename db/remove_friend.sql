delete from friends_list
where user_id=$1 and friend_id=$2;

delete from friends_list
where user_id=$2 and friend_id=$1;

select friends_list.user_id, friend_id, first_name, last_name, charity, profile_pic from friends_list
join users on (friends_list.friend_id = users.user_id)
where friends_list.user_id = $1;