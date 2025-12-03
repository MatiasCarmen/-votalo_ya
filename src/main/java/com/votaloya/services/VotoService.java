package com.votaloya.services;

import com.votaloya.dto.request.VotoRequest;
import com.votaloya.entities.*;
import com.votaloya.repositories.CandidatoRepository;
import com.votaloya.repositories.UsuarioRepository;
import com.votaloya.repositories.VotoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;



@Service
@RequiredArgsConstructor
public class VotoService {
    private final VotoRepository votoRepository;
    private final CandidatoRepository candidatoRepository;
    private final UsuarioRepository usuarioRepository;

    @Transactional
    public Voto votar(VotoRequest request, String dni) {
        Usuario votante = usuarioRepository.findByDni(dni)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        if (votante.getRol() != Rol.VOTANTE) {
            throw new RuntimeException("Solo los votantes pueden votar");
        }

        Candidato candidato = candidatoRepository.findById(request.getCandidatoId())
                .orElseThrow(() -> new RuntimeException("Candidato no encontrado"));

        Evento evento = candidato.getEvento();

        java.time.LocalDateTime ahora = java.time.LocalDateTime.now();

        // RQF05: Impedir acceso antes de la fecha de inicio
        if (ahora.isBefore(evento.getFechaInicio())) {
            throw new RuntimeException("El proceso de votación aún no ha iniciado. Inicia el: " +
                    evento.getFechaInicio().format(java.time.format.DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm")));
        }

        // RQF05: Impedir acceso después de la fecha de cierre
        if (ahora.isAfter(evento.getFechaFin())) {
            throw new RuntimeException("El proceso de votación ha finalizado. Finalizó el: " +
                    evento.getFechaFin().format(java.time.format.DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm")));
        }

        if (!evento.estaActivo()) {
            throw new RuntimeException("El evento no está activo");
        }

        if (votoRepository.existsByVotanteIdAndEventoId(votante.getId(), evento.getId())) {
            throw new RuntimeException("Ya has votado en este evento");
        }

        Voto voto = Voto.builder()
                .votante(votante)
                .candidato(candidato)
                .evento(evento)
                .build();

        return votoRepository.save(voto);
    }
}
