package com.votaloya.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "candidatos")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@JsonIgnoreProperties({ "evento", "votos" })
public class Candidato {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nombre;

    @Column(length = 1000)
    private String descripcion;

    private String partido;

    @Column(name = "avatar_url")
    private String avatarUrl;

    @Column(name = "fecha_registro", nullable = false)
    private java.time.LocalDateTime fechaRegistro;

    @ManyToOne
    @JoinColumn(name = "evento_id", nullable = false)
    private Evento evento;

    @OneToMany(mappedBy = "candidato", cascade = CascadeType.ALL)
    @lombok.Builder.Default
    private List<Voto> votos = new ArrayList<>();

    public int contarVotos() {
        return votos.size();
    }

    @PrePersist
    protected void onCreate() {
        if (fechaRegistro == null) {
            fechaRegistro = java.time.LocalDateTime.now();
        }
    }
}
