insert into messages (user_message, user_id, friend_id)
values ($1, $2, $3);
insert into messages (reciever_message, user_id, friend_id)
values ($1, $3, $2);

select message_id, messages.user_id, user_message, reciever_message, friend_id from messages 
join users on (users.user_id = messages.friend_id)
where friend_id = $3 and messages.user_id = $2; 