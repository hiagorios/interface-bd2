-- Antes de inserir um evento, é checado se o id_organizador realmente é de um organizador ou administrador
CREATE OR REPLACE FUNCTION insert_evento_trigger_func() RETURNS TRIGGER AS
$$ 
BEGIN
	IF NOT EXISTS (SELECT 1 from usuario where (tipo_usuario = 'O' OR tipo_usuario = 'A') AND id = NEW.id_organizador) THEN
		RAISE EXCEPTION 'Para cadastrar eventos é necessário ser um Organizador!';
	END IF;
	RETURN NEW;
END; $$ LANGUAGE 'plpgsql';

CREATE TRIGGER insert_evento_trigger
BEFORE INSERT ON evento
FOR EACH ROW
EXECUTE PROCEDURE insert_evento_trigger_func();