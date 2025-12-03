package com.votaloya.controllers;

import com.votaloya.dto.request.EventoRequest;
import com.votaloya.dto.response.ResultadoVotacionDTO;
import com.votaloya.entities.Evento;
import com.votaloya.services.EventoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/admin/eventos")
@RequiredArgsConstructor
public class EventoController {
    private final EventoService eventoService;

    @PostMapping
    public ResponseEntity<?> crearEvento(
            @Valid @RequestBody EventoRequest request,
            @AuthenticationPrincipal String dni) {
        try {
            Evento evento = eventoService.crearEvento(request, dni);
            return ResponseEntity.ok(evento);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<List<Evento>> listarEventos() {
        return ResponseEntity.ok(eventoService.listarEventosActivos());
    }

    @GetMapping("/todos")
    public ResponseEntity<List<Evento>> listarTodosEventos() {
        return ResponseEntity.ok(eventoService.listarTodosEventos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> obtenerEvento(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(eventoService.obtenerEvento(id));
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> editarEvento(
            @PathVariable Long id,
            @Valid @RequestBody EventoRequest request,
            @AuthenticationPrincipal String dni) {
        try {
            Evento evento = eventoService.editarEvento(id, request, dni);
            return ResponseEntity.ok(evento);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminarEvento(
            @PathVariable Long id,
            @AuthenticationPrincipal String dni) {
        try {
            eventoService.eliminarEvento(id, dni);
            return ResponseEntity.ok("Evento eliminado correctamente");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PatchMapping("/{id}/desactivar")
    public ResponseEntity<?> desactivarEvento(
            @PathVariable Long id,
            @AuthenticationPrincipal String dni) {
        try {
            Evento evento = eventoService.desactivarEvento(id, dni);
            return ResponseEntity.ok(evento);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/{id}/resultados")
    public ResponseEntity<?> obtenerResultados(
            @PathVariable Long id,
            @AuthenticationPrincipal String dni) {
        try {
            List<ResultadoVotacionDTO> resultados =
                    eventoService.obtenerResultados(id, dni);
            return ResponseEntity.ok(resultados);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/{id}/resultados/csv")
    public ResponseEntity<?> exportarResultadosCSV(
            @PathVariable Long id,
            @AuthenticationPrincipal String dni) {
        try {
            String csv = eventoService.exportarResultadosCSV(id, dni);
            return ResponseEntity.ok()
                    .header("Content-Type", "text/csv")
                    .header("Content-Disposition", "attachment; filename=resultados_" + id + ".csv")
                    .body(csv);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/{id}/resultados/pdf")
    public ResponseEntity<?> exportarResultadosPDF(
            @PathVariable Long id,
            @AuthenticationPrincipal String dni) {
        try {
            byte[] pdf = eventoService.exportarResultadosPDF(id, dni);
            return ResponseEntity.ok()
                    .header("Content-Type", "application/pdf")
                    .header("Content-Disposition", "attachment; filename=resultados_" + id + ".pdf")
                    .body(pdf);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}