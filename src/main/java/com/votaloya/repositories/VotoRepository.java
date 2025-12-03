package com.votaloya.repositories;

import com.votaloya.entities.Voto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface VotoRepository extends JpaRepository<Voto, Long> {
    boolean existsByVotanteIdAndEventoId(Long votanteId, Long eventoId);
    Optional<Voto> findByVotanteIdAndEventoId(Long votanteId, Long eventoId);
    List<Voto> findByEventoId(Long eventoId);

    @Query("SELECT v FROM Voto v WHERE v.evento.id = :eventoId")
    List<Voto> obtenerVotosPorEvento(Long eventoId);
}
