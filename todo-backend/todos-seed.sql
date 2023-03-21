-- "testuser" has the password "password"


INSERT INTO users (username, password, is_admin)
VALUES ('testuser',
        '12589',
        FALSE);

INSERT INTO todos (title, 
                    username,
                    habit_description)

VALUES ('Learn Java', 'testuser', '2 hours a day'),
        ('Go to the gym', 'testuser', 'Take water bottle'),
        ('Drink Water', 'testuser', '3 liters a day');

