CREATE TABLE ToDo( 
id serial PRIMARY KEY,
    Task character varying(128),
    Comp character varying(128) not null,
    del character varying(128)
    );
    
    
    INSERT INTO ToDo (Task,Comp,del) VALUES

('go to the store','<button>complete</button>','<button>Del</button>');
