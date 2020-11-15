-- Cria um registro em ministrante_evento para cada id de ministrante
CREATE OR REPLACE FUNCTION insert_ministrantes_evento(ids_ministrantes INT[], id_evento int) RETURNS BOOLEAN AS
$$ 
DECLARE id_m int;
BEGIN
	FOREACH id_m IN ARRAY ids_ministrantes
   LOOP 
      INSERT INTO ministrante_evento values (id_m, id_evento);
   END LOOP;
	
	RETURN true;
END; $$ LANGUAGE 'plpgsql';