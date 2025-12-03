package com.votaloya.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ErrorResponse {
    private String error;
    private String mensaje;
    private String path;
    private LocalDateTime timestamp;
    private int status;

    public ErrorResponse(String error, String mensaje, String path, int status) {
        this.error = error;
        this.mensaje = mensaje;
        this.path = path;
        this.status = status;
        this.timestamp = LocalDateTime.now();
    }
}

