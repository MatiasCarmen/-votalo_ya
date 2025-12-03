package com.votaloya.dto.response;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ResultadoVotacionDTO {
    private Long candidatoId;
    private String nombreCandidato;
    private String partido;
    private Integer totalVotos;
    private Double porcentaje;
}
