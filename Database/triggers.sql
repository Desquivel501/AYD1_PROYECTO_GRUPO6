DROP TRIGGER IF EXISTS before_insert_usuarios;
CREATE TRIGGER before_insert_usuarios
  BEFORE INSERT ON Usuarios 
  FOR EACH ROW
  SET new.fecha_registro =  NOW();
  