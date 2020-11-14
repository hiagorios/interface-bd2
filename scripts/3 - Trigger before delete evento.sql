-- Ao deletar um evento, são removidas as linhas em ministrante_evento e participante_evento relacionadas.
CREATE OR REPLACE FUNCTION delete_evento_trigger_func() RETURNS TRIGGER AS
$$ 
DECLARE cursor_ministrante CURSOR FOR SELECT * FROM ministrante_evento WHERE id_evento = OLD.id;
		cursor_participante CURSOR FOR SELECT * FROM participante_evento WHERE id_evento = OLD.id;
		rec_ministrante record;
		rec_participante record;

BEGIN
	OPEN cursor_ministrante;
	OPEN cursor_participante;
	
	FETCH cursor_ministrante INTO rec_ministrante;
	WHILE (FOUND) LOOP
		DELETE FROM ministrante_evento WHERE CURRENT OF cursor_ministrante;
		FETCH cursor_ministrante INTO rec_ministrante;
	END LOOP;
	
	FETCH cursor_participante INTO rec_participante;
	WHILE (FOUND) LOOP
		DELETE FROM participante_evento WHERE CURRENT OF cursor_participante;
		FETCH cursor_participante INTO rec_participante;
	END LOOP;
	
	CLOSE cursor_ministrante;
	CLOSE cursor_participante;

	RETURN OLD;
END; $$ LANGUAGE 'plpgsql';

CREATE TRIGGER delete_evento_trigger
BEFORE DELETE ON evento
FOR EACH ROW
EXECUTE PROCEDURE delete_evento_trigger_func();