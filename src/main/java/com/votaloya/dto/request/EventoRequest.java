package com.votaloya.dto.request;
import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class EventoRequest {
    @NotBlank(message = "El nombre es obligatorio")
    private String nombre;

    private String descripcion;

    @NotNull(message = "La fecha de inicio es obligatoria")
    private String fechaInicio;

    @NotNull(message = "La fecha de fin es obligatoria")
    private String fechaFin;
}
