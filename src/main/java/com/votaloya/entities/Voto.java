package com.votaloya.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "votos", uniqueConstraints = {
        @UniqueConstraint(columnNames = { "votante_id", "evento_id" })
})
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@JsonIgnoreProperties({ "votante", "candidato", "evento" })
public class Voto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "votante_id", nullable = false)
    private Usuario votante;

    @ManyToOne
    @JoinColumn(name = "candidato_id", nullable = false)
    private Candidato candidato;

    @ManyToOne
    @JoinColumn(name = "evento_id", nullable = false)
    private Evento evento;

    @Column(name = "fecha_voto", nullable = false)
    private LocalDateTime fechaVoto;

    @PrePersist
    protected void onCreate() {
        fechaVoto = LocalDateTime.now();
    }
}
