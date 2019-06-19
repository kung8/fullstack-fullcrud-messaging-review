select *
from users 
where username ilike ${username} and password = ${password};