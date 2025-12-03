package com.votaloya.repositories;
import com.votaloya.entities.Candidato;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CandidatoRepository extends JpaRepository<Candidato, Long> {
    List<Candidato> findByEventoId(Long eventoId);
}
