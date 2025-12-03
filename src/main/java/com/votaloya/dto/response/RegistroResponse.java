package com.votaloya.dto.response;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class RegistroResponse {
    private String mensaje;
    private String dni;
    private String nombresCompletos;
    private String correo;
}
