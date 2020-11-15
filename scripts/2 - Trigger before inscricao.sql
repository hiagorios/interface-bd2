-- Antes de inserir participante_evento, é checado se a data atual está dentro do período de inscrição do evento
CREATE OR REPLACE FUNCTION insert_inscricao_trigger_func() RETURNS TRIGGER AS
$$ 
DECLARE inicio timestamp with time zone;
		fim timestamp with time zone;
		agora timestamp with time zone;
BEGIN
	SELECT data_inicio_inscricao INTO inicio from evento where id = NEW.id_evento;
	SELECT data_fim_inscricao INTO fim from evento where id = NEW.id_evento;
	agora := NOW();
	IF NOT (agora BETWEEN inicio AND fim) THEN
		RAISE EXCEPTION 'Não é possível se cadastrar no evento fora do período de inscrições!';
	END IF;
	RETURN NEW;
END; $$ LANGUAGE 'plpgsql';

CREATE TRIGGER insert_inscricao_trigger
BEFORE INSERT ON participante_evento
FOR EACH ROW
EXECUTE PROCEDURE insert_inscricao_trigger_func();