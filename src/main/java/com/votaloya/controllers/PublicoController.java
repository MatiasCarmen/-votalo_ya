package com.votaloya.controllers;

import com.votaloya.dto.response.ResultadoVotacionDTO;
import com.votaloya.entities.Candidato;
import com.votaloya.entities.Evento;
import com.votaloya.services.CandidatoService;
import com.votaloya.services.EventoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/publico")
@RequiredArgsConstructor
public class PublicoController {

    private final EventoService eventoService;
    private final CandidatoService candidatoService;

    @GetMapping("/eventos/activos")
    public ResponseEntity<List<Evento>> listarEventosActivos() {
        return ResponseEntity.ok(eventoService.listarEventosActivos());
    }

    @GetMapping("/eventos/{id}")
    public ResponseEntity<?> obtenerEvento(@PathVariable Long id) {
        try {
            Evento evento = eventoService.obtenerEvento(id);
            return ResponseEntity.ok(evento);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/eventos/{id}/candidatos")
    public ResponseEntity<List<Candidato>> listarCandidatos(@PathVariable Long id) {
        return ResponseEntity.ok(candidatoService.listarCandidatosPorEvento(id));
    }

    @GetMapping("/eventos/{id}/resultados")
    public ResponseEntity<?> verResultados(@PathVariable Long id) {
        try {
            Evento evento = eventoService.obtenerEvento(id);

            // Verificar que el evento haya finalizado (RQF09)
            if (LocalDateTime.now().isBefore(evento.getFechaFin())) {
                return ResponseEntity.badRequest()
                        .body("Los resultados estarán disponibles cuando finalice el proceso de votación");
            }

            // Obtener resultados sin autenticación
            List<ResultadoVotacionDTO> resultados =
                    eventoService.obtenerResultados(id, null);

            Map<String, Object> response = new HashMap<>();
            response.put("evento", evento);
            response.put("resultados", resultados);

            // Calcular ganador y totales (RQF10)
            if (!resultados.isEmpty()) {
                ResultadoVotacionDTO ganador = resultados.get(0);
                int totalVotos = resultados.stream()
                        .mapToInt(ResultadoVotacionDTO::getTotalVotos)
                        .sum();

                response.put("ganador", ganador);
                response.put("totalVotos", totalVotos);
            }

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}

