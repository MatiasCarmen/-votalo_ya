package com.votaloya.controllers;

import com.votaloya.dto.request.VotoRequest;
import com.votaloya.entities.Evento;
import com.votaloya.services.EventoService;
import com.votaloya.services.VotoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/votar")
@RequiredArgsConstructor
public class VotoController {
    private final VotoService votoService;
    private final EventoService eventoService;

    @PostMapping
    public ResponseEntity<?> votar(
            @Valid @RequestBody VotoRequest request,
            @AuthenticationPrincipal String dni) {
        try {
            votoService.votar(request, dni);
            return ResponseEntity.ok("Voto registrado exitosamente");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/eventos")
    public ResponseEntity<List<Evento>> listarEventosActivos() {
        return ResponseEntity.ok(eventoService.listarEventosActivos());
    }
}