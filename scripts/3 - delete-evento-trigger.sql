CREATE OR REPLACE FUNCTION delete_evento_trigger_func() RETURNS trigger AS
$$ BEGIN
	DELETE FROM ministrante_evento where id_evento = OLD.id;
	DELETE FROM participante_evento where id_evento = OLD.id;
	RETURN OLD;
END; $$ LANGUAGE 'plpgsql';

CREATE TRIGGER delete_evento_trigger
BEFORE DELETE ON evento
FOR EACH ROW
EXECUTE PROCEDURE delete_evento_trigger_func();