select id, message,message_id, pic, user_id,username
from messages
join users on users.id = messages.user_id
order by message_id;