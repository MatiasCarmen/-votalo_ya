package com.votaloya.entities;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "eventos_votacion")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Evento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nombre;

    @Column(length = 1000)
    private String descripcion;

    @Column(name = "fecha_inicio", nullable = false)
    private LocalDateTime fechaInicio;

    @Column(name = "fecha_fin", nullable = false)
    private LocalDateTime fechaFin;

    @Column(nullable = false)
    private Boolean activo = true;

    @ManyToOne
    @JoinColumn(name = "creador_id", nullable = false)
    private Usuario creador;

    @OneToMany(mappedBy = "evento", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Candidato> candidatos = new ArrayList<>();

    @OneToMany(mappedBy = "evento", cascade = CascadeType.ALL)
    private List<Voto> votos = new ArrayList<>();

    @Column(name = "fecha_creacion")
    private LocalDateTime fechaCreacion;

    public boolean estaActivo() {
        LocalDateTime ahora = LocalDateTime.now();
        return activo && ahora.isAfter(fechaInicio) && ahora.isBefore(fechaFin);
    }

    @PrePersist
    protected void onCreate() {
        if (fechaCreacion == null) {
            fechaCreacion = LocalDateTime.now();
        }
    }
}
