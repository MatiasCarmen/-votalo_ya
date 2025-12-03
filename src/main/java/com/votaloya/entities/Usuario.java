package com.votaloya.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "usuarios")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nombres", nullable = false)
    private String nombres;

    @Column(name = "apellidos", nullable = false)
    private String apellidos;

    @Column(name = "dni", nullable = false, unique = true)
    private String dni;

    @Column(name = "numero_telefono", nullable = false, length = 9)
    private String numeroTelefono;

    @Column(name = "correo_electronico", nullable = false, unique = true)
    private String correo;

    @Column(name = "contrasena", nullable = false)
    private String contrasena;

    @Enumerated(EnumType.STRING)
    @Column(name = "rol", nullable = false)
    private Rol rol;

    @OneToMany(mappedBy = "votante")
    @lombok.Builder.Default
    private Set<Voto> votos = new HashSet<>();

    public String getNombreCompleto() {
        return nombres + " " + apellidos;
    }




}
