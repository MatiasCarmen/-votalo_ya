package com.votaloya.repositories;
import com.votaloya.entities.Evento;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
public interface EventoRepository extends JpaRepository<Evento,Long> {
    List<Evento> findByActivoTrue();
}
