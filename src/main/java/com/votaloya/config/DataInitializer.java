package com.votaloya.config;

import com.votaloya.entities.Rol;
import com.votaloya.entities.Usuario;
import com.votaloya.repositories.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataInitializer implements CommandLineRunner {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        // Crear usuario administrador por defecto si no existe (RQF01)
        if (usuarioRepository.findByDni("12345678").isEmpty()) {
            Usuario admin = Usuario.builder()
                    .nombres("Administrador")
                    .apellidos("Sistema")
                    .dni("12345678")
                    .numeroTelefono("999999999")
                    .correo("admin@votaloya.com")
                    .contrasena(passwordEncoder.encode("admin123"))
                    .rol(Rol.ADMINISTRADOR)
                    .build();

            usuarioRepository.save(admin);
            log.info("Usuario administrador por defecto creado - DNI: 12345678, Contraseña: admin123");
        }

        // Crear algunos votantes de ejemplo
        if (usuarioRepository.findByDni("87654321").isEmpty()) {
            Usuario votante1 = Usuario.builder()
                    .nombres("Juan")
                    .apellidos("Pérez")
                    .dni("87654321")
                    .numeroTelefono("987654321")
                    .correo("juan.perez@example.com")
                    .contrasena(passwordEncoder.encode("votante123"))
                    .rol(Rol.VOTANTE)
                    .build();

            usuarioRepository.save(votante1);
            log.info("Usuario votante de ejemplo creado - DNI: 87654321, Contraseña: votante123");
        }

        if (usuarioRepository.findByDni("11223344").isEmpty()) {
            Usuario votante2 = Usuario.builder()
                    .nombres("María")
                    .apellidos("González")
                    .dni("11223344")
                    .numeroTelefono("912345678")
                    .correo("maria.gonzalez@example.com")
                    .contrasena(passwordEncoder.encode("votante123"))
                    .rol(Rol.VOTANTE)
                    .build();

            usuarioRepository.save(votante2);
            log.info("Usuario votante de ejemplo creado - DNI: 11223344, Contraseña: votante123");
        }
    }
}

