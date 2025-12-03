package com.votaloya.controllers;
import com.votaloya.dto.request.LoginRequest;
import com.votaloya.dto.request.RegistroRequest;
import com.votaloya.dto.response.AuthResponse;
import com.votaloya.dto.response.RegistroResponse;
import com.votaloya.entities.Usuario;
import com.votaloya.config.JwtUtil;
import com.votaloya.services.UsuarioService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final UsuarioService usuarioService;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    @PostMapping("/registro")
    public ResponseEntity<?> registrar(@Valid @RequestBody RegistroRequest request) {
        try {
            Usuario usuario = usuarioService.registrar(request);

            RegistroResponse response = new RegistroResponse(
                    "Usuario registrado exitosamente",
                    usuario.getDni(),
                    usuario.getNombreCompleto(),
                    usuario.getCorreo()
            );

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest request) {
        try {
            Usuario usuario = usuarioService.buscarPorDni(request.getDni());

            if (!passwordEncoder.matches(request.getContrasena(), usuario.getContrasena())) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body("Credenciales inválidas");
            }


            String token = jwtUtil.generarToken(usuario.getDni(), usuario.getRol().name());

            AuthResponse response = new AuthResponse(
                    token,
                    usuario.getDni(),
                    usuario.getNombreCompleto(),
                    usuario.getCorreo(),
                    usuario.getRol().name()
            );

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Credenciales inválidas");
        }
    }
}
