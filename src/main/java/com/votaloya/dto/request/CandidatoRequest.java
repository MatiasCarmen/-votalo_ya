package com.votaloya.dto.request;
import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class CandidatoRequest {
    @NotBlank(message = "El nombre es obligatorio")
    private String nombre;

    private String descripcion;
    private String partido;
    private String avatarUrl;

    @NotNull(message = "El ID del evento es obligatorio")
    private Long eventoId;
}
