package com.votaloya.dto.request;
import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class VotoRequest {
    @NotNull(message = "El ID del candidato es obligatorio")
    private Long candidatoId;
}
