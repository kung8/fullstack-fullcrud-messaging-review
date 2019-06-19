create table messages (
message_id serial primary key, 
message text, 
user_id int references users(id)
);