package com.votaloya.dto.response;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AuthResponse {
    private String token;
    private String dni;
    private String nombresCompletos;
    private String correo;
    private String rol;
}
