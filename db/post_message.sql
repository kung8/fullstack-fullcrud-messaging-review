insert into messages (message,user_id)
values (${message},${user_id});

select id, message,message_id, pic, user_id,username
from messages
join users on users.id = messages.user_id
order by message_id;

-- insert into message (message,user_id)
-- value ($1,$2)