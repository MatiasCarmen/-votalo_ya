package com.votaloya.services;

import com.votaloya.dto.request.RegistroRequest;
import com.votaloya.entities.Rol;
import com.votaloya.entities.Usuario;
import com.votaloya.repositories.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UsuarioService {
    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    public Usuario registrar(RegistroRequest request) {
        if (usuarioRepository.existsByDni(request.getDni())) {
            throw new RuntimeException("El DNI ya está registrado");
        }
        if (usuarioRepository.existsByCorreo(request.getCorreo())) {
            throw new RuntimeException("El correo ya está registrado");
        }

        Usuario usuario = Usuario.builder()
                .nombres(request.getNombres())
                .apellidos(request.getApellidos())
                .dni(request.getDni())
                .contrasena(passwordEncoder.encode(request.getContrasena()))
                .correo(request.getCorreo())
                .numeroTelefono(request.getNumeroTelefono())
                .rol(Rol.valueOf(request.getRol()))
                .build();

        return usuarioRepository.save(usuario);
    }

    public Usuario buscarPorDni(String dni) {
        return usuarioRepository.findByDni(dni)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
    }
}
