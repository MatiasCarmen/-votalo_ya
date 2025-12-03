package com.votaloya.dto.request;
import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class LoginRequest {
    @NotBlank(message = "El DNI es obligatorio")
    @Pattern(regexp = "^[0-9]{8}$", message = "El DNI debe tener 8 dígitos")
    private String dni;

    @NotBlank(message = "La contraseña es obligatoria")
    private String contrasena;
}
