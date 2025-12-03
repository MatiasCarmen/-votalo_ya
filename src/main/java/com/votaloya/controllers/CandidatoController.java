package com.votaloya.controllers;
import com.votaloya.dto.request.CandidatoRequest;
import com.votaloya.entities.Candidato;
import com.votaloya.services.CandidatoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/admin/candidatos")
@RequiredArgsConstructor
public class CandidatoController {
    private final CandidatoService candidatoService;

    @PostMapping
    public ResponseEntity<?> crearCandidato(
            @Valid @RequestBody CandidatoRequest request,
            @AuthenticationPrincipal String dni) {
        try {
            Candidato candidato = candidatoService.crearCandidato(request, dni);
            return ResponseEntity.ok(candidato);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/evento/{eventoId}")
    public ResponseEntity<List<Candidato>> listarCandidatos(@PathVariable Long eventoId) {
        return ResponseEntity.ok(candidatoService.listarCandidatosPorEvento(eventoId));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> editarCandidato(
            @PathVariable Long id,
            @Valid @RequestBody CandidatoRequest request,
            @AuthenticationPrincipal String dni) {
        try {
            Candidato candidato = candidatoService.editarCandidato(id, request, dni);
            return ResponseEntity.ok(candidato);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminarCandidato(
            @PathVariable Long id,
            @AuthenticationPrincipal String dni) {
        try {
            candidatoService.eliminarCandidato(id, dni);
            return ResponseEntity.ok("Candidato eliminado correctamente");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}